import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "../store/store";
import { updateLoading } from "../store/loadingSlice";

const Loading = () => {
    const loading = useSelector(state => state.loading.value);
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            const state = store.getState();
            const { progress } = state.loading.value;
            if (progress < 65) {
                dispatch(updateLoading({ progress: progress + 10 }));
            } else if (progress < 95) {
                dispatch(updateLoading({ progress: progress * 1.02 }));
            }

        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <div id="loading-container">
        <div id="loading">
            <div>Loading</div>
            <div>
                <div className="loading-bar">
                    <span style={{ width: `${loading.progress}%` }} />
                </div>
            </div>
        </div>
    </div>;
}

export default Loading;