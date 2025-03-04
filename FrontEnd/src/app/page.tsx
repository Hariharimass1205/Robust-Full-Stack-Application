"use client";
import AddReview from "@/components/EnterReview";
import ReviewList from "@/components/ReviewList";
import React, { useState } from "react";

const Page = () => {
  const [btn, setBtn] = useState(false);
  return (
    <div className="p-4">
      {!btn && (
        <button
          onClick={() => setBtn(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Add Review
        </button>
      )}
      {btn==false?<ReviewList />:""}
      {btn && <AddReview stateChange={setBtn} />}
    </div>
  );
};

export default Page;
