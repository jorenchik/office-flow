import React from 'react'

export default function ErrorPage({error, errorCode}) {
    return (
        <div className="h-screen flex items-center bg-gray-100">
            <div className="container mx-auto px-4">
                <section className="py-8 px-4 text-center">
                    <div className="max-w-auto mx-auto">
                        <div class="md:max-w-lg mx-auto">
                            <div className='text-8xl'>
                                {errorCode} </div>
                        </div>
                        <h2 className="mt-8 uppercase text-slate-600 text-xl lg:text-4xl">
                            Something went wrong </h2>
                        <p className="mt-6 text-base lg:text-2xl text-gray-900">{error}</p>

                        <a href='/' className="mt-6 bg-cyan-600 hover:bg-cyan-800 transition text-white py-4 px-6 rounded-full inline-block uppercase shadow-md">Back to homepage</a>
                    </div>
                </section>
            </div>
        </div>
    );
};
