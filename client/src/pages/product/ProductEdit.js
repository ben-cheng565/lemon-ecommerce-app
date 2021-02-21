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
  } = useSelector((state) => state.editProduct);

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
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Product - {productId}</h1>
        </div>
        {loadingUpdate && <LoadingBox />}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
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
            <div>
              <label htmlFor="imageFile">Image File</label>
              <input
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
            <div>
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="brand">Brand</label>
              <input
                id="brand"
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="countInStock">CountInStock</label>
              <input
                id="countInStock"
                type="text"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label></label>
              <button type="submit">Update</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default ProductEdit;
