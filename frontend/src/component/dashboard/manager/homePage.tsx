type HomePageProps = {
  messData: {
    totalMeals: number;
  };
};

export default function HomePage({ messData }: HomePageProps) {
  return (
    <>
      <div className="stats shadow flex items-center justify-center">
        <div className="stat place-items-center">
          <div className="stat-title">Total Meals</div>
          <div className="stat-value">{messData.totalMeals}</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Total Cost</div>
          <div className="stat-value">4,200</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Per Meal</div>
          <div className="stat-value">1,200</div>
        </div>
      </div>
    </>
  );
}
