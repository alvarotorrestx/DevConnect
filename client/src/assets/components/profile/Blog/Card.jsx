
function Card() {
  return (
    <div className='h-min-[200px] p-3 flex flex-col justify-between rounded-sm shadow-md w-[250px] bg-base-300'>
      <h3 className='text-lg text-center text-[#222222e5]'>
        IT Is Going To Boom 2026
      </h3>
      
      <p className='text-sm  text-center'>
        The IT sector is expected to witness exponential growth driven by AI, cloud, and automation.
      </p>

      <button className='bg-[#325ce6a7] rounded text-white w-[90px] mx-auto mt-2 text-sm py-[2px]'>
        Visit Now
      </button>
    </div>
  );
}

export default Card;
