"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import GameImage from "./GameImage";

const DATA = [
  {
    input: "naruto",
    buttons: "hnastoruasdd",
  },
  {
    input: "mikasaa",
    buttons: "hnaasdads",
  },
];

function InputForm() {
  const [userInput, setUserInput] = useState([]);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const gameImageChildRef = useRef(); //to call function from GameImage component (ie child component)

  useEffect(() => {
    //if user input fields are all field
    if (userInput.length == DATA[0].input.length) {
      const answerStr = DATA[0].input.toUpperCase();
      const userInputStr = userInput.join(""); //convert userInput array to string

      //check user input name is correct or not.
      if (answerStr === userInputStr) {
        setIsLevelComplete(true);
      } else {
        gameImageChildRef.current.shakeImage();
      }
    }
  }, [userInput]);

  const handleLetterBtn = (e) => {
    //if user input field is empty
    if (DATA[0].input.length > userInput.length) {
      setUserInput((uerInput) => [...userInput, e.target.value.toUpperCase()]);
    }
  };

  // to remove last letter from user inputs
  const handleDelete = (e) => {
    setUserInput((prevUserInput) => prevUserInput.slice(0, -1)); //remove last items from array.
  };

  return (
    <>
      <GameImage ref={gameImageChildRef} isLevelComplete={isLevelComplete} />
      <div className="w-full text-center justify-center flex flex-col items-center mt-[1rem]">
        <div className="flex gap-2 flex-wrap py-6">
          {[...DATA[0].input].map((input, i) => (
            <input
              key={i}
              type="text"
              disabled
              value={userInput.length > i ? userInput[i] : ""}
              className="w-[35px] h-[35px] text-center bg-transparent border-b-2 border-white uppercase text-white text-2xl rounded-sm"
            />
          ))}
        </div>
        {isLevelComplete ? (
          <button className="uppercase text-white bg-[#786170] shadow-md text-lg w-[200px] py-2 rounded-3xl my-2 hover:bg-[#675260] active:bg-[#675260] transition-all ease-in-out duration-300">
            Next
          </button>
        ) : (
          <div className="flex flex-wrap gap-2 max-w-[400px] justify-center">
            {[...DATA[0].buttons].map((btn, i) => (
              <button
                key={i}
                value={btn}
                onClick={handleLetterBtn}
                className="uppercase w-[40px] h-[40px] text-2xl bg-slate-200 rounded-sm curser-pointer shadow-md hover:bg-slate-300 active:bg-slate-400 transation-all ease-in-out duration-300"
              >
                {btn}
              </button>
            ))}
            <button
              onClick={handleDelete}
              className="uppercase w-[40px] h-[40px] text-2xl bg-slate-300 rounded-sm curser-pointer shadow-md hover:bg-slate-300 active:bg-slate-400 transation-all ease-in-out duration-300"
            >
              <i className="fa-solid fa-delete-left"></i>
            </button>
          </div>
        )}
      </div>

      {/* Footer buttons ------------  */}
      <div className="text-center flex justify-center items-center gap-10 mt-[40px]">
        <button
          onClick={() => console.log("back")}
          className="text-[#e0dbdb] bg-[#786170] h-[45px] w-[45px] rounded-full shadow-md flex justify-center items-center text-2xl hover:bg-[#675260] active:bg-[#675260] transition-all ease-in-out duration-300"
        >
          <i className="fa-solid fa-backward"></i>
        </button>
        <Link href="/">
          <button className="text-[#e0dbdb] bg-[#786170] h-[55px] w-[55px] rounded-full shadow-md flex justify-center items-center text-2xl hover:bg-[#675260] active:bg-[#675260] transition-all ease-in-out duration-300">
            <i className="fa-sharp fa-solid fa-house"></i>
          </button>
        </Link>
        <button className="text-[#e0dbdb] bg-[#786170] h-[45px] w-[45px] rounded-full shadow-md flex justify-center items-center text-2xl hover:bg-[#675260] active:bg-[#675260] transition-all ease-in-out duration-300 relative">
          <i className="fa-solid fa-lightbulb"></i>
          <p className="text-[#2D1C3D] absolute right-[-12px] bottom-[0px] text-[20px] font-semibold bg-[#ffff00] h-[25px] w-[25px] flex items-center justify-center rounded-full">
            3
          </p>
        </button>
      </div>
    </>
  );
}

export default InputForm;
