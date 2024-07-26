import React from 'react'

const NewJob = () => {
  return (
    <div className="overflow-x-hidden">
      <section className="container px-4 mx-auto">
        <h1 className="text-xl font-bold">Post a New Job</h1>
        <div className="py-4">
          <form className="w-full">
            <div className="border border-slate-800 p-8 text-center">
              <h3 className="text-center mb-2 font-bold text-4xl">
                Upload the job Description
              </h3>
              <p className="text-center">
                Upload either DOC, DOCX, PDF, or TXT file types (4MB max)
              </p>
              <button className="py-2 px-4 h-10 w-[240px] bg-blue-600 text-white text-nowrap text-center cursor-pointer mt-4">
                Upload Job Description
              </button>
            </div>
            <div className="flex items-start justify-between gap-8 w-full my-4">
              <div className="flex-1">
                <label htmlFor="Job Title" className="">
                  Job Title <span className="text-red-600">*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="p-2 border border-slate-900 outline-none w-full"
                  placeholder="Job title"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="Job Title" className="">
                  Job Title <span className="text-red-600">*</span>
                </label>
                <br />
                <input
                  type="text"
                  className="p-2 border border-slate-900 outline-none w-full"
                  placeholder="Job title"
                />
              </div>
            </div>
            <div className="w-full my-4">
              <label htmlFor="Job Title" className="">
                Job Title <span className="text-red-600">*</span>
              </label>
              <br />
              <input
                type="text"
                className="p-2 border border-slate-900 outline-none w-full"
                placeholder="Job title"
              />
            </div>
            <div className="w-full my-4">
              <label htmlFor="Description" className="">
                Description <span className="text-red-600">*</span>
              </label>
              <br />
              <textarea
                className="p-2 border border-slate-900 outline-none w-full min-h-[200px] max-h-[300px]"
                placeholder="Job Description"
              />
            </div>
            <div className="flex items-center justify-end w-full">
              <button
                type="submit"
                className="py-2 px-4 h-10 w-[150px] bg-blue-600 text-white text-nowrap text-center cursor-pointer mt-4"
              >
                Post Job
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default NewJob
