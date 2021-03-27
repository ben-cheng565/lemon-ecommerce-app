import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../components/common/LoadingBox";
import MessageBox from "../../components/common/MessageBox";
import { editProduct, fetchProductDetail } from "../../redux/actions/product";
import { PRODUCT_UPDATE_RESET } from "../../redux/actionTypes";

function ProductEdit(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");

  const { loading, error, product } = useSelector(
    (state) => state.productDetail
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.productEdit);

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push("/productlist");
    }

    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(fetchProductDetail(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
    }
  }, [dispatch, productId, product, props.history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      editProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        brand,
        description,
        countInStock,
      })
    );
  };

  const { userInfo } = useSelector((state) => state.user);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);

    try {
      const { data } = await axios.post("/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div className="container my-5" style={{ width: "50%" }}>
      <div className="card shadow">
        <div className="card-header">
          <span className="fs-4">Edit Product</span>
        </div>
        <div className="card-body">
          <form className="mx-5" onSubmit={submitHandler}>
            {loadingUpdate && <LoadingBox />}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
                <div className="mb-3">
                  <label className="form-label" htmlFor="id">
                    ID
                  </label>
                  <input
                    className="form-control"
                    id="id"
                    type="text"
                    disabled
                    value={productId}
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="form-control"
                    id="name"
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label" htmlFor="price">
                      Price
                    </label>
                    <input
                      className="form-control"
                      id="price"
                      type="text"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    ></input>
                  </div>
                  <div className="col">
                    <label className="form-label" htmlFor="countInStock">
                      Stock
                    </label>
                    <input
                      className="form-control"
                      id="countInStock"
                      type="text"
                      placeholder="Enter countInStock"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label" htmlFor="category">
                      Category
                    </label>
                    <input
                      className="form-control"
                      id="category"
                      type="text"
                      placeholder="Enter category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    ></input>
                  </div>
                  <div className="col">
                    <label className="form-label" htmlFor="brand">
                      Brand
                    </label>
                    <input
                      className="form-control"
                      id="brand"
                      type="text"
                      placeholder="Enter brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    ></input>
                  </div>
                </div>

                {/* <div>
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div> */}
                <div className="mb-3">
                  <label className="form-label" htmlFor="imageFile">
                    Image File
                  </label>
                  <input
                    className="form-control"
                    id="imageFile"
                    type="file"
                    accept="image/jpeg"
                    label="Choose image"
                    onChange={uploadFileHandler}
                  ></input>
                  {loadingUpload && <LoadingBox />}
                  {errorUpload && (
                    <MessageBox variant="danger">{errorUpload}</MessageBox>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="4"
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-3 d-flex justify-content-end">
                  <button className="btn btn-primary me-2" type="submit">
                    Update
                  </button>
                  <button className="btn btn-secondary" type="button">
                    Close
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductEdit;
