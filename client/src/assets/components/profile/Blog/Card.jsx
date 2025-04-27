function Card() {
  return (
    <div className="min-h-[200px] p-3 flex flex-col justify-between rounded-sm shadow-md w-[250px] bg-base-300">
      <h3 className="text-lg text-center text-base-content opacity-70 font-medium">
        IT Is Going To Boom 2026
      </h3>

      <p className="text-sm text-center text-base-content/80">
        The IT sector is expected to witness exponential growth driven by AI,
        cloud, and automation.
      </p>
      <button className="btn btn-secondary mx-auto my-2">Visit Now</button>
    </div>
  );
}

export default Card;
