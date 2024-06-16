import React, { useEffect, useState } from "react";

export const FontToggle = () => {
  const [fontFamily, setFontFamily] = useState("font-sans");

  useEffect(() => {
    document.body.classList.add(fontFamily);
  }, [fontFamily]);

  const toggleFont = () => {
    document.body.classList.remove(fontFamily);

    setFontFamily((prevFont) =>
      prevFont === "font-sans" ? "font-serif" : "font-sans",
    );
  };

  return (
    <div className={`min-h-screen ${fontFamily}`}>
      <button
        onClick={toggleFont}
        className="rounded bg-blue-500 p-2 text-white"
      >
        Toggle Font
      </button>
      <p className="mt-4">
        This is a sample text. The current font is{" "}
        {fontFamily === "font-inter" ? "Inter" : "Source Serif"}.
      </p>
    </div>
  );
};
