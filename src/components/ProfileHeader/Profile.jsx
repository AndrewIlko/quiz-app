import { useEffect, useState } from "react";
import axios from "axios";
import ImageUploading from "react-images-uploading";
import { userActions } from "../../features/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { image, email, bestResult } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { setImage } = userActions;
  const [quizResults, setQuizResults] = useState(null);
  const [changeImg, setChangeImg] = useState(false);

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

  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:5000/quiz-results", {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((res) => res.data)
        .then((res) => {
          console.log(res);
          setQuizResults(res);
        });
    })();
  }, []);
  return (
    <>
      <div className="profile">
        <div className="profile__left-side">
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url('${image}')` }}
            onMouseEnter={() => {
              setChangeImg(true);
            }}
            onMouseLeave={() => {
              setChangeImg(false);
            }}
          >
            <ImageUploading
              onChange={(e) => {
                onImgUpload(e);
                setChangeImg(false);
              }}
              dataURLKey="url"
              acceptType={["webp", "png", "jpg"]}
            >
              {({ onImageUpload }) => (
                <div
                  className="profile__avatar-change"
                  onClick={onImageUpload}
                  style={
                    changeImg
                      ? { visibility: "visible", opacity: "1" }
                      : { visibility: "hidden", opacity: "0" }
                  }
                >
                  <div>
                    <i className="material-icons">photo_camera</i>
                    <span>Edit</span>
                  </div>
                </div>
              )}
            </ImageUploading>
          </div>
          <div className="profile__info">
            <div className="row-with-icon">
              <span className="row-with-icon__icon">📧</span>
              <span className="row-with-icon__text">
                <strong>Email:</strong> {email}
              </span>
            </div>
            <div className="row-with-icon">
              <span className="row-with-icon__icon">😎</span>
              <span className="row-with-icon__text">
                <strong>Best result:</strong> {bestResult}%
              </span>
            </div>
          </div>
        </div>
        <div className="profile__right-side">
          <div className="profile-quizes__wrapper">
            <div className="profile-quizes__title">Your quizes</div>
            <ul className="profile-quizes__list">
              {quizResults &&
                quizResults.map(({ name, result, optionsCount, id }) => {
                  return (
                    <>
                      <li className="profile-quizes__list-item">
                        <div className="profile-quizes__list-item-title">
                          {name}
                        </div>
                        <div className="profile-quizes__list-item-result">
                          {result} / {optionsCount}
                        </div>
                        <Link
                          className="profile-quizes__list-item-link"
                          to={`/quiz/${id}`}
                        >
                          Link
                        </Link>
                      </li>
                    </>
                  );
                })}
            </ul>
          </div>
        </div>
        {/* <div
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
        <ul className="profile-results">
          {quizResults &&
            quizResults.map(({ name, result, optionsCount, id }) => {
              return (
                <>
                  <li className="profile-results__item">
                    <div className="profile-results__item-title">{name}</div>
                    <div className="profile-results__item-result">
                      {result} / {optionsCount}
                    </div>
                    <Link
                      className="profile-results__item-link"
                      to={`/quiz/${id}`}
                    >
                      Link
                    </Link>
                  </li>
                </>
              );
            })}
        </ul> */}
      </div>
    </>
  );
};

export default Profile;
