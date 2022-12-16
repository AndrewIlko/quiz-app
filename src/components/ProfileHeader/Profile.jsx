import { useEffect, useState } from "react";
import axios from "axios";
import ImageUploading from "react-images-uploading";
import { userActions } from "../../features/userReducer";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const { image } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { setImage } = userActions;

  const saveImage = async (url) => {
    await axios
      .post("http://localhost:5000/profile-image", { url })
      .then((res) => res.data)
      .then((res) => console.log(res));
  };

  const onImgUpload = (image) => {
    const url = image[0].url;
    dispatch(setImage(url));
    saveImage(url);
  };

  return (
    <>
      <div className="profile">
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url('${image}')` }}
        >
          <ImageUploading
            onChange={onImgUpload}
            dataURLKey="url"
            acceptType={["webp", "png", "jpg"]}
          >
            {({ onImageUpload }) => (
              <button onClick={onImageUpload}>Click or Drop here</button>
            )}
          </ImageUploading>
        </div>
      </div>
    </>
  );
};

export default Profile;
