import React from 'react';
import { Dialog, DialogActions, DialogContent, Slide, makeStyles } from '@material-ui/core';
import ButtonStyled from '../../Components/Form/Button';
import { useCreateStage } from '../../hooks/useCreateStage';

const useStyles = makeStyles({
    root: {
    },
    paper: {
        textTransform: 'initial',
        backgroundColor: "#4B4B4B"
    }
});

const modalTransition = React.forwardRef(function Transition(
    props: { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export enum StagePresetImages {
    BAND = "band",
    CHOIR = "choir",
    DANCE = "dance",
    THEATRE = "theatre",
    DIVERSE1 = "diverse 1",
    DIVERSE2 = "diverse 2",
    DIVERSE3 = "diverse 3",
    DIVERSE4 = "diverse 4",
    DIVERSE5 = "diverse 5",
    DIVERSE6 = "diverse 6",
}

const stageImages: string[] = [
    StagePresetImages.BAND,
    StagePresetImages.CHOIR,
    StagePresetImages.DANCE,
    StagePresetImages.THEATRE,
    StagePresetImages.DIVERSE1,
    StagePresetImages.DIVERSE2,
    StagePresetImages.DIVERSE3,
    StagePresetImages.DIVERSE4,
    StagePresetImages.DIVERSE5,
    StagePresetImages.DIVERSE6
]

export default function StageImageModal(props: {
    open: boolean,
    handleClose: () => void
}) {
    const {
        open,
        handleClose
    } = props
    const classes = useStyles();
    const { image, handleSetImage } = useCreateStage();
    const [selectedIamge, setSelectedImage] = React.useState<string | undefined>();


    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            const file = URL.createObjectURL(e.target.files[0]);
            setSelectedImage(file)
        }
    }

    const handleSave = () => {
        if (selectedIamge) {
            handleSetImage(selectedIamge)
        }
        handleClose()
    }

    return (
        <div>
            <Dialog
                maxWidth="xs"
                open={open}
                TransitionComponent={modalTransition}
                keepMounted={true}
                classes={{
                    root: classes.root,
                    paper: classes.paper
                }}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <div className="stage-image-modal">
                        <div className="w-100">
                            {/* Colors/Icons tabs */}
                            <div className="d-flex flex-column">
                                <div className="w-100">
                                    <h6 className="white my-4">Upload an image:</h6>
                                    <input
                                        type="file"
                                        onChange={handleChangeImage}
                                        className="file-input"
                                        accept="image/*"
                                    />
                                </div>
                                <div className="w-100">
                                    <h6 className="white my-4">Select an image:</h6>
                                    <div className="d-flex" style={{ overflowX: "auto" }}>
                                        {stageImages.map((el: string) => {
                                            return <img
                                                key={el}
                                                src={require(`../../assets/images/presets/${el}.svg`)}
                                                width="150px"
                                                height="150px"
                                                alt="preset"
                                                onClick={()=>setSelectedImage(`../../assets/images/presets/${el}.svg`)}
                                            />
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <ButtonStyled
                        className="button-white"
                        text="Cancel"
                        onClick={handleClose}
                    />
                    <ButtonStyled
                        className="button-red"
                        text="Save"
                        onClick={handleSave}
                    />
                </DialogActions>
            </Dialog>
        </div>
    );
}