import bgVideo from "../../../assets/video/bg1.mp4";

export function UpcomingEventsVideoBackground() {
	return (
		<div className="absolute inset-0 pointer-events-none" aria-hidden="true">
			<video
				className="absolute inset-0 h-full w-full object-cover"
				autoPlay
				muted
				loop
				playsInline
			>
				<source src={bgVideo} type="video/mp4" />
			</video>

			{/* Keep card content readable over motion background */}
			<div className="absolute inset-0 bg-black/55" />

			{/* Fade edges so the section blends with adjacent black sections */}
			<div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-black to-transparent" />
			<div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-black to-transparent" />
		</div>
	);
}
