import React from "react";

function StarRating({score}) {
  // Round to 1 decimal
  const roundedScore = parseFloat(score.toFixed(1));
  const fullStars = Math.floor(roundedScore);
  const decimalPart = Math.round((roundedScore - fullStars) * 100);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "#444", fontSize: "0.9rem" }}>
      {Array.from({ length: 5 }).map((_, index) => {
        // Full star
        if (index < fullStars) {
          return (
            <svg key={index} viewBox="0 0 24 24" width="20" height="20" fill="#E6CA97">
              <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.782 1.402 8.174L12 18.897l-7.336 3.87 1.402-8.174L.132 9.211l8.2-1.193z" />
            </svg>
          );
        }

        // Fractional star
        if (index === fullStars && decimalPart > 0) {
          const gradientId = `fractional-gradient-${decimalPart}`;
          return (
            <svg key={index} viewBox="0 0 24 24" width="20" height="20" fill={`url(#${gradientId})`}>
              <defs>
                <linearGradient id={gradientId}>
                  <stop offset={`${decimalPart}%`} stopColor="#E6CA97" />
                  <stop offset={`${decimalPart}%`} stopColor="#D9D9D9" />
                </linearGradient>
              </defs>
              <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.782 1.402 8.174L12 18.897l-7.336 3.87 1.402-8.174L.132 9.211l8.2-1.193z" />
            </svg>
          );
        }

        // Empty star
        return (
          <svg key={index} viewBox="0 0 24 24" width="20" height="20" fill="#D9D9D9">
            <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.782 1.402 8.174L12 18.897l-7.336 3.87 1.402-8.174L.132 9.211l8.2-1.193z" />
          </svg>
        );
      })}
      <span style={{ fontSize: "0.85rem" }}>{roundedScore} / 5</span>
    </div>
  );
}

export default StarRating;
