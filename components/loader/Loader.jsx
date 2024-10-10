import React from "react";
import "./style.css";

const Loader = () => {
	return (
		<div className="fixed z-100 flex items-center justify-center w-full h-screen">
			<span className="loader" />
		</div>
	);
};

export default Loader;
