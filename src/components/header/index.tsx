import React from "react";

const HeaderFrame = () => {
	return (
		<div
			className={`w-full h-16 flex justify-start items-center container max-sm:px-5`}
		>
			<h1 className={`text-slate-300 text-xl font-[500]`}>
				Movie Filter
			</h1>
		</div>
	);
};

export default HeaderFrame;
