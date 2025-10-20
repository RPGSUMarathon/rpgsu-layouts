import { useEffect, useRef, useState } from 'react';
import {IntermissionLogoSocialMedia} from './IntermissionLogoSocialMedia';
import { CrossOverLogo } from './CrossOverLogo';
import Logo from "../../img/text-banner.png";


export const RotatingImage = ({ className = '' }: { className?: string }) => {
	const [activeIndex, setActiveIndex] = useState<0 | 1 | 2>(1);
	const [isVisible, setIsVisible] = useState(true);
	const timeoutsRef = useRef<number[]>([]);

	useEffect(() => {
		const FADE_MS = 1000; // fade in/out duration
		const DISPLAY_MS = 15000; // time fully visible before fade out

		// Clear any existing timeouts when effect re-runs/unmounts
		timeoutsRef.current.forEach((id) => window.clearTimeout(id));
		timeoutsRef.current = [];

		// Ensure we start visible
		setIsVisible(true);

		// After DISPLAY_MS, start fade out
		timeoutsRef.current.push(
			window.setTimeout(() => {
				setIsVisible(false);
				// After fade completes, switch the active index and fade in
				timeoutsRef.current.push(
					window.setTimeout(() => {
						setActiveIndex((prev) => (prev === 0 ? 1 : prev === 1 ? 2 : 0));
						setIsVisible(true);
					}, FADE_MS)
				);
			}, DISPLAY_MS)
		);

		return () => {
			timeoutsRef.current.forEach((id) => window.clearTimeout(id));
			timeoutsRef.current = [];
		};
	}, [activeIndex]);

	// If the intermission logo is not present initially (e.g., replicant not ready),
	// start by showing the static text banner so something is visible.
	useEffect(() => {
		// Run once on mount
		const img = new Image();
		img.src = Logo;
		img.onload = () => {
			// If nothing rendered yet (both layers at opacity-0), ensure one is visible
			setIsVisible(true);
		};
	}, []);

	return (
		<div className={`grid place-items-center w-9/12 mx-auto ${className}`}>
			{/* Layer 1: IntermissionLogoImage */}
			<div
				className={`col-start-1 row-start-1 w-1/2 transition-opacity duration-1000 ${
					activeIndex === 0 ? (isVisible ? 'opacity-100' : 'opacity-0') : 'opacity-0'
				}`}
			>
				<CrossOverLogo />
			</div>

			{/* Layer 2: Static Logo image */}
			<div
				className={`col-start-1 w-9/12 row-start-1  transition-opacity duration-1000 ${
					activeIndex === 1 ? (isVisible ? 'opacity-100' : 'opacity-0') : 'opacity-0'
				}`}
			>
				<img src={Logo} alt="Logo" />
			</div>

			<div
				className={`col-start-1 row-start-1 transition-opacity duration-1000 ${
					activeIndex === 2 ? (isVisible ? 'opacity-100' : 'opacity-0') : 'opacity-0'
				}`}
			>
				<IntermissionLogoSocialMedia />
			</div>
		</div>
	);
}