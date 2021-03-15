import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../../common/LoadingBox";
import MessageBox from "../../common/MessageBox";
import {
  createReview,
  fetchProductDetail,
} from "../../../redux/actions/product";

// import "./ProductDetail.css";
import ProductContent from "./productContent/ProductContent";
import AddToCart from "./addToCart/AddToCart";
import Rating from "../../common/Rating";
import { REVIEW_CREATE_RESET } from "../../../redux/actionTypes";

function ProductDetail(props) {
  // const product = data.products.find((p) => p._id === props.match.params.id);
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  const { product, loading, error } = productDetail;
  const reviewCreate = useSelector((state) => state.reviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = reviewCreate;
  const { userInfo } = useSelector((state) => state.user);
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (successReviewCreate) {
      alert("Review submitted successfully.");
      setRating(0);
      setComment("");
      dispatch({ type: REVIEW_CREATE_RESET });
    }
    dispatch(fetchProductDetail(productId));
  }, [dispatch, productId, successReviewCreate]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (rating && comment) {
      dispatch(
        createReview(productId, { rating, comment, userId: userInfo._id })
      );
    } else {
      alert("Please select rating and enter comment.");
    }
  };

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <div className="m-3">
            <Link to="/">
              <i class="fas fa-chevron-circle-left"></i> Go Back
            </Link>
          </div>
          <div className="row">
            <div className="col-9">
              <ProductContent product={product} />
            </div>
            <div className="col-3 mb-auto">
              <AddToCart
                product={product}
                qty={qty}
                setQty={setQty}
                addToCartHandler={addToCartHandler}
              />
            </div>
            <div className="row m-4">
              <hr />
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-7 mb-auto">
                <div className="fs-3">Reviews</div>
                {product.reviews.length === 0 && (
                  <MessageBox>There is no review.</MessageBox>
                )}

                <ul>
                  {product.reviews.map((review) => (
                    <li key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating rating={review.rating} caption=" "></Rating>
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-4 mb-auto">
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <div className="fs-4">Write a product review</div>
                    <div className="form-group mt-3">
                      <label for="rating">Rating</label>
                      <select
                        className="form-control mt-2"
                        id="rating"
                        // style={{ width: "80%" }}
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excenllent</option>
                      </select>
                    </div>
                    <div class="form-group mt-3">
                      <label for="comment">Comment</label>
                      <textarea
                        className="form-control mt-2"
                        id="comment"
                        // style={{ width: "80%" }}
                        value={comment}
                        rows="4"
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="form-group mt-4">
                      <button
                        className="btn btn-outline-primary"
                        type="submit"
                        // style={{ width: "80%" }}
                      >
                        Submit
                      </button>
                      {loadingReviewCreate && <LoadingBox />}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                      {successReviewCreate && (
                        <MessageBox variant="success">
                          Review submitted successfully.
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review.
                  </MessageBox>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
