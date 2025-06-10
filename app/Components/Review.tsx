import React, { useEffect, useState } from "react";
import { SiTicktick } from "react-icons/si";
import supabase from "utils/supabase";
import type { Review } from "~/library/interface";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { differenceInDays } from "date-fns";



export const ReviewComponent: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>()
     const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
        const { data, error } = await supabase
            .from("Review")
            .select("*");

        if (error) {
            console.error("Error fetching reviews:", error.message);
            setError(error.message);
        } else {
            setReviews(data || []);
            console.log("reviews: ", data)

        }
        };

        fetchReviews();
    }, []);


    


  return (
        <section className="col-span-2 pl-10 text-black">
        <h2 className="text-4xl mb-8 font-bold ">
            Đánh giá
        </h2>

        <div className="text-black md:grid md:grid-cols-2">
            <section className="" >
            <div className="flex flex-row gap-4 font-black mb-2"  aria-label="4.3 out of 5 stars">
                <span className=" text-2xl">4.3</span>
                <div
                className="flex flex-row"
                data-testid="reviews__stars"
                aria-label="Rating: 4.3 out of 5 stars"
                role="img"
                >
                {[0, 1, 2, 3, 4].map((_, i) => (
                    <svg
                    key={i}
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="stars_star__mjpR0"
                    >
                    <defs>
                        <clipPath id={`star-${i}`}>
                        <path
                            d="M22.3498 27.54L14.0005 21.0646L5.60596 27.5165L8.8893 17.1675L0.460938 10.7745L10.8412 10.8569L14.0005 0.460938L17.1484 10.8569L27.5513 10.8216L19.1116 17.1675L22.3611 27.5518L22.3498 27.54Z"
                            fill="#ffb005"
                        />
                        </clipPath>
                    </defs>
                    <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill="#ffb005"
                        clipPath={`url(#star-${i})`}
                    />
                    <rect
                        x={i === 4 ? "30%" : "100%"}
                        y="0"
                        width="100%"
                        height="100%"
                        fill="#D9D9D9"
                        clipPath={`url(#star-${i})`}
                    />
                    </svg>
                ))}
                </div>
            </div>

            <p className="font-light text-sm text-gray-700 mb-4">Based on 253 reviews</p>
            <div className=" text-sm font-light flex flex-row items-center gap-1 mb-4 " data-testid="reviews__recommenders">
                <SiTicktick />
                84% who purchased would recommend this
            </div>

            <h4 className="font-bold text-base uppercase mb-4">Rating snapshot</h4>
            <div className="text-sm flex flex-col gap-2 font-light" data-testid="reviews__breakdown">
                {[
                { stars: 5, count: 173, percentage: 68.38 },
                { stars: 4, count: 33, percentage: 13.04 },
                { stars: 3, count: 23, percentage: 9.09 },
                { stars: 2, count: 9, percentage: 3.56 },
                { stars: 1, count: 15, percentage: 5.93 },
                ].map((item, idx) => (
                <div key={idx} className="flex flex-row justify-between  items-center">
                    <p className="flex flex-row items-center text-left px-2">{`${item.stars} (${item.count})`}</p> 
                    <progress className=" h-1 progress progress-neutral w-6/7"  value={item.percentage} max="100"></progress>
                </div>
                ))}
            </div>
            </section>
            <section className=" text-black px-10">
                <h4 className="font-bold text-base uppercase mb-4">Đánh giá trung bình</h4>
                <div className="bg-black px-2 text-sm font-bold max-w-30 text-center py-2 uppercase text-white rounded-3xl">
                    Chất Lượng
                </div>
                <progress className="progress progress-success bg-green-300 w-full h-1" value="90" max="100"></progress>
                <div className="flex text-xs font-light flex-row justify-between">
                    <p>1 Sao</p>
                    <p>5 Sao</p>
                </div>
            </section>
        </div>


        <div className="mt-24 col-span-2">

        </div>
        {reviews?.map((review, index)=>{
            return(
            <div key={index} className="  col-span-2 md:grid md:grid-cols-3 text-black">
                <div className=" text-xs gap-2 font-light flex flex-col">
                    <div className="text-base font-semibold capitalize">{review.full_name}</div>
                    {review.isApproved && <div className="flex mb-4 flex-row justify-start items-center "> <RiVerifiedBadgeFill color={"green"} /> Verified buyer </div>}
                    <div> <span className="font-semibold"> Tuổi:</span> {review.age}</div>
                    <div> <span className="font-semibold">  Hoạt động:</span> {review.activity}</div>
                    <div>   <span className="font-semibold"> Tần suất thể thao: </span> {review.workout_frequency}</div>

                </div>
                <div className="col-span-2 flex flex-col gap-3">
                    <div className="flex flex-row items-center gap-4 font-black mb-2"  aria-label="4.3 out of 5 stars">
                        <span className=" text-sm">4.3</span>
                        <div
                            className="flex flex-row"
                            data-testid="reviews__stars"
                            aria-label={`Rating: ${review.star}`}
                            role="img"
                            >
                            {[0, 1, 2, 3, 4].map((_, i) => {
                                // Compute fill percentage for each star (0 to 100)
                                const starFill = Math.min(Math.max(review.star - i, 0), 1) * 100;

                                return (
                                <svg
                                    key={i}
                                    width="20"
                                    height="20"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="stars_star__mjpR0"
                                >
                                    <defs>
                                    <clipPath id={`star-${i}`}>
                                        <path
                                        d="M22.3498 27.54L14.0005 21.0646L5.60596 27.5165L8.8893 17.1675L0.460938 10.7745L10.8412 10.8569L14.0005 0.460938L17.1484 10.8569L27.5513 10.8216L19.1116 17.1675L22.3611 27.5518L22.3498 27.54Z"
                                        fill="#ffb005"
                                        />
                                    </clipPath>
                                    </defs>
                                    {/* Yellow fill */}
                                    <rect
                                    x="0"
                                    y="0"
                                    width={`${starFill}%`}
                                    height="100%"
                                    fill="#ffb005"
                                    clipPath={`url(#star-${i})`}
                                    />
                                    {/* Gray background */}
                                    <rect
                                    x={`${starFill}%`}
                                    y="0"
                                    width={`${100 - starFill}%`}
                                    height="100%"
                                    fill="#D9D9D9"
                                    clipPath={`url(#star-${i})`}
                                    />
                                </svg>
                                );
                            })}
                            </div>

                        <span className="text-xs text-gray-400" >{differenceInDays(new Date(), new Date(review.created_at))} days ago</span>
                    </div>
                    <div className="">
                        <div className="font-semibold" >{review.title}</div>
                        <div className="font-light text-sm">{review.review}</div>
                    </div>

                </div>
                <div className="col-span-2 border my-10 border-gray-300 w-full"></div>
            </div>
            )
        })}
        
        </section>
        

  );
};
