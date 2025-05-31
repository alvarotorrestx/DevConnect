
import Card from './Card'

function Blog() {
  return (
    <div className="max-w-[90%] lg:max-w-4xl mx-auto p-6 bg-base-100 rounded-lg shadow-md mt-5 relative">
      <h1 className='font-bold'>My Posts / Blog</h1>
      <br />
      <div className='flex items-center justify-center gap-[10px] md:gap-[40px]'>
      <Card/>
      <Card/>
      </div>
      
    </div>
  )
}

export default Blog
