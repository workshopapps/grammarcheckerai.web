import { useEffect, useState } from 'react';
import { ReviewCard } from './ReviewCard';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import rater1 from '../../../assets/raters/rater1.png';
import rater2 from '../../../assets/raters/rater2.png';
import rater3 from '../../../assets/raters/rater3.png';
import rater4 from '../../../assets/raters/rater4.png';
import unknownUser from '../../../assets/raters/unknown.png';
import stars from '../../../assets/raters/star.png';
import starbar5 from '../../../assets/raters/bars/5starbar.png';
import starbar4 from '../../../assets/raters/bars/4starbar.png';
import starbar3 from '../../../assets/raters/bars/3starbar.png';
import starbar2 from '../../../assets/raters/bars/2starbar.png';
import Footer from '../landing-page/Footer';
import axios from 'axios';
import { Avatar } from '@mui/material';
import { ratingsData } from './RatingData';
import Pagination from '../../../components/Pagination/Pagination';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

export default function Ratings() {
  const [openReviewModal, setOpenReviewModal] = useLocalStorage('review', false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 6;
  const [allReview, setAllReview] = useState([]);
  const closeModal = () => {
    setOpenReviewModal(true);
  };

  const indexOfLastCard = currentPage * reviewsPerPage;
  const indexOfFirstCard = indexOfLastCard - reviewsPerPage;

  const paginate = (pageNumber) => {
    window.scrollTo({ top: 350, left: 0, behavior: 'smooth' });
    setCurrentPage(pageNumber);
  };

  // Get random avatar for other users
  const getRandomAvatar = () => {
    return [rater1, rater2, rater3, rater4].sort(() => 0.5 - Math.random()).slice(0, 1);
  };

  useEffect(() => {
    axios
      .get('https://api.speakbetter.hng.tech/v1/rating') // Used my login details ID here as well
      .then((response) => {
        setAllReview(
          response.data.response.filter((obj) => {
            if (obj.comment !== '') {
              return obj;
            }
          }),
        );

        setAllReview((reviews) =>
          reviews.map((obj) => {
            if (obj.userid === null) {
              return { name: 'A Google User', ...obj };
            }
            return obj;
          }),
        );

        if (allReview.length <= 5) {
          setAllReview((prev) => [...prev, ...ratingsData]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [openReviewModal]);

  const formatDate = (date) => {
    const padTo2Digits = (num) => {
      return num.toString().padStart(2, '0');
    };
    return [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('/');
  };

  const userToken = localStorage.getItem('grittyusertoken'); // Get bearer token
  const addRate = async (ratings, comment, userId) => {
    await axios
      .get(`https://api.speakbetter.hng.tech/v1/user/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`, // Token Authorization
        },
      }) // Used my login details ID here as well
      .then((response) => {
        const userDetails = response.data.data;
        setAllReview((prev) => [
          {
            name: userDetails.username,
            userid: userId,
            imageElement: (
              <Avatar
                alt={`${userDetails.firstName} ${userDetails.lastName}`}
                sx={{ bgcolor: '#8C54BF', fontSize: '0.9rem' }}
                src="/static/images/avatar/1.jpg"
              >
                {userDetails ? userDetails.firstName.charAt(0) + '' + userDetails.lastName.charAt(0) : 'NA'}
              </Avatar>
            ),
            ratings: ratings,
            date: formatDate(new Date()),
            comment: comment,
          },
          ...prev,
        ]);
      })
      .catch(() => {
        setAllReview((prev) => [
          {
            name: 'You',
            img: unknownUser,
            ratings: ratings,
            date: formatDate(new Date()),
            comment: comment,
          },
          ...prev,
        ]);
      });
  };

  const currentReview = allReview.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div>
      <div className="mx-4 lg:mx-32">
        <div className="flex justify-between my-6">
          <Link to="/" className="text-[#5D387F] text-xs">
            {' '}
            &lt; Home{' '}
          </Link>
          <Link to="/testimonials" className="text-[#5D387F] text-xs">
            {' '}
            Testimonials &gt;
          </Link>
        </div>
        <h1 className="my-4">Ratings and Reviews</h1>
        <p className="text-xs">
          Ratings and reviews are verified and are from people who use the same type of device that you use
        </p>
        <section className="flex items-center my-12">
          <div className="mr-2 lg:mr-6 space-y-2">
            <h2 className="text-3xl">4.6</h2>
            <span className="flex">
              {[...Array(5)].map((_, index) => {
                return <img src={stars} key={index} alt="" />;
              })}
            </span>
            <p>10,0001</p>
          </div>
          <div className="w-2/3">
            <div className="flex justify-between sm:justify-start lg:m-2 items-center space-x-2 xs:space-x-4">
              <span> 5 </span>
              <img src={starbar5} alt="" className="h-2 w-11/12 xs:w-auto" />
            </div>
            <div className="flex justify-between sm:justify-start lg:m-2 items-center space-x-2 xs:space-x-4">
              <span> 4 </span>
              <img src={starbar4} alt="" className="h-2 w-11/12 xs:w-auto" />
            </div>
            <div className="flex justify-between sm:justify-start lg:m-2 items-center space-x-2 xs:space-x-4">
              <span> 3 </span>
              <img src={starbar3} alt="" className="h-2 w-11/12 xs:w-auto" />
            </div>
            <div className="flex justify-between sm:justify-start lg:m-2 items-center space-x-2 xs:space-x-4">
              <span> 2 </span>
              <img src={starbar2} alt="" className="h-2 w-11/12 xs:w-auto" />
            </div>
            <div className="flex justify-between sm:justify-start lg:m-2 items-center space-x-2 xs:space-x-4">
              <span> 1 </span>
              <img src={starbar2} alt="" className="h-2 w-11/12 xs:w-auto" />
            </div>
          </div>
        </section>
        <main className="grid xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full justify-between my-12">
          {currentReview.map((rating, index) => {
            return (
              <section key={index} className="space-y-2">
                <div className="flex items-center">
                  {rating.userid === null ? (
                    <img
                      src={getRandomAvatar()}
                      alt="a google user"
                      width="50px"
                      height="50px"
                      className="bg-purple mr-4 xs:mr-2 sm:mr-4"
                    />
                  ) : rating.img ? (
                    <img
                      src={rating.img}
                      alt="a google user"
                      width="45px"
                      height="45px"
                      className="bg-purple mr-4 xs:mr-2 sm:mr-4"
                    />
                  ) : (
                    <div className="mr-4 xs:mr-2 sm:mr-4">{rating.imageElement}</div>
                  )}
                  <div className="space-y-1">
                    <p className="text-xs">{rating.name ? rating.name : rating.userid.username}</p>
                    <span className="flex">
                      {[...Array(5)].map((_, index) => {
                        if (rating.ratings >= index + 1) {
                          return <img src={stars} key={index} alt="stars" />;
                        }
                        return <FaStar key={index} color="#a9a9a9" />;
                      })}
                    </span>
                    <p className="text-xs">{rating.date ? rating.date : formatDate(new Date(rating.updatedAt))}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs">{rating.comment}</p>
                </div>
              </section>
            );
          })}
        </main>

        {reviewsPerPage > 5 && (
          <Pagination
            cardsPerPage={reviewsPerPage}
            page={currentPage}
            totalCards={allReview.length}
            paginate={paginate}
          />
        )}
        {!openReviewModal && <ReviewCard postReview={addRate} closeModal={closeModal} />}
      </div>
      <Footer />
    </div>
  );
}
