import React from 'react';

import styles from './RestartBtn.scss';

const RestartBtn = (props) => (
	<button className={`btn ${styles.restart_btn}`}
		onClick={props.restart}>Restart</button>
)

export default RestartBtn;
