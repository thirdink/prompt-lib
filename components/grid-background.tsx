import React from 'react';

export function GridBackground() {
	return (
		<div className='h-[50rem] w-full dark:bg-background bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center'>
			{/* Radial gradient for the container to give a faded look */}
			<div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-background bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>
			<div className='flex flex-col text-center'>
				<p className='text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] sm:text-7xl relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-700 to-black dark:text-transparent dark:bg-gradient-to-b dark:from-neutral-200 dark:to-neutral-500 py-8'>
					Prompt Lib
				</p>
				<p className=' text-xl sm:text-xl font-light relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-700 to-black dark:text-transparent dark:bg-gradient-to-b dark:from-neutral-200 dark:to-neutral-500 py-8'>
					Your personal prompt library
				</p>
				<p className=' text-xl sm:text-xl font-extralight relative z-20 text-transparent bg-gradient-to-b from-neutral-700 to-black  bg-clip-text dark:text-transparent dark:bg-gradient-to-b dark:from-neutral-200 dark:to-neutral-500 py-8'>
					coming soon
				</p>
			</div>
		</div>
	);
}
