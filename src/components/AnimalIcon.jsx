import React from "react"
import ProgressBar from "react-bootstrap/ProgressBar"
import { Link } from "react-router-dom"
import { useMyStoreActions, useMyStoreState } from "../store"
import "./AnimalIcon.css"

const AnimalIcon = ({ courseId, imageUrl, text, link }) => {
	const user = useMyStoreState((state) => state.user)
	const updateTreat = useMyStoreActions((state) => state.changeTreat)
	const updateMood = useMyStoreActions((state) => state.changeMood)

	const treatNum = user.courseData[courseId].treats
	const moodNum = user.courseData[courseId].mood

	const handleButtonClick = () => {
		if (treatNum > 0) {
			if (moodNum !== 100) {
				updateMood({ courseId, changeFunction: (m) => Math.min(m + 5, 100) }) // Increase mood by 5
				updateTreat({ courseId, changeFunction: (t) => Math.max(t - 5, 0) }) // Decrease treat by 5
			} else {
				alert("Your pet is already full!")
			}
		} else {
			alert("You're out of treats! Turn in assignments to get more.")
		}
	}

	return (
		<div className="animal-icon">
			<div className="animal-image flex items-center justify-center p-3 relative">
				<img
					src={imageUrl[moodNum >= 75 ? 2 : moodNum < 50 ? 0 : 1]} //changes what image is rendered depending on moodIndex
					alt="Animal"
					className="max-w-[12vh]"
				/>
				<div className="absolute -right-14">
					<div className="flex flex-col items-center">
						<ProgressBar
							variant={moodNum >= 75 ? "success" : moodNum < 50 ? "danger" : "warning"} //changes color of progress bar depending on moodIndex
							now={moodNum}
							className="w-[100px] -rotate-90"
						/>
						<button onClick={handleButtonClick}>
							<img src={"/images/add.png"} alt="Animal" className="relative top-[5vh] aspect-square w-[1.5vh]" />
						</button>
					</div>
				</div>
			</div>
			<Link to={link} className="mt-2 block text-center text-black no-underline hover:underline">
				{text}
				<div>{`Treats: ${treatNum}`}</div>
			</Link>
		</div>
	)
}

export default AnimalIcon
