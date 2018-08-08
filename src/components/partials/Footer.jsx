import React from "react";

const Footer = () => {
	return (
		<footer style={style}>
			<p style={style.p}>
				Made with <b style={style.b}>&hearts;</b> by{" "}
				<a href="https://alisher.me" style={style.a}>
					Alisher Musurmonov
				</a>
			</p>
		</footer>
	);
};

const style = {
	margin: "60px 0 0",
	padding: "20px 0",
	textAlign: "center",
	backgroundColor: "#0c6a94",

	p: {
		margin: 0,
		color: "#fff"
	},
	a: {
		color: "#d4d4d4",
		textDecoration: "underline"
	},
	b: {
		color: "#FFC107",
		fontSize: "24px",
		margin: "0 5px"
	}
};
export default Footer;
