import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  const { id } = useParams();
  const getMovie = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    );
    const json = await response.json();
    setDetail(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div className={styles.wrap}>
      {loading ? (
        <h1 className={styles.wrap__loading}>Loading...</h1>
      ) : (
        <div className={styles.detailwrap}>
          <img
            className={styles.detailwrap__bg}
            src={detail.background_image_original}
          />
          <div className={styles.detailwrap__content}>
            <img
              className={styles.detailwrap__content__img}
              src={detail.medium_cover_image}
            />
            <div className={styles.detailwrap__content__text}>
              <h1 className={styles.detailwrap__content__text__title}>
                {detail.title}
              </h1>
              <p className={styles.detailwrap__content__text__paragraph}>
                {detail.description_full}
              </p>
              <ul className={styles.detailwrap__content__text__else}>
                <li>rating: {detail.rating} / 10</li>
                <li>download: {detail.download_count}</li>
                <li>year: {detail.year}</li>
              </ul>
              <a
                className={styles.detailwrap__content__text__link}
                href={detail.url}
              >
                Go to Website
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Detail;
