import { useEffect, useState } from "react";
import axios from "axios";
import ImageUploading from "react-images-uploading";
import { userActions } from "../../features/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { image } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { setImage } = userActions;
  const [quizResults, setQuizResults] = useState(null);

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
        </ul>
      </div>
    </>
  );
};

export default Profile;
