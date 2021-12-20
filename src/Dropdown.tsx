import React, { useCallback, useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import styled from 'styled-components';

import { Tabs, Tab, Content } from "./Tabs";
import {Help}from"./Help";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import LineWeightIcon from '@material-ui/icons/LineWeightOutlined';
import FontSizeIcon from '@material-ui/icons/FormatSizeOutlined';
import HeightIcon from '@material-ui/icons/HeightOutlined';
import { Button } from '@material-ui/core'

import { ColorPicker } from './ColorPicker';
import { zIndexSearch } from './util';
import { ScrollBar } from './ScrollBar';
import { useDispatch } from "./Context";
import { TagsForm } from "./TagsForm";

interface Style {
    fontSize: number,
    height: number,
    color: {
        fontColor: string;
        modal: string;
        highlight: string;
        shadow: string;
        backgroundModal: string;
    },
    fontWeight: number,
    font: string,
    splitWords: string[]
}

const useStyles = makeStyles({
    root: {
        width: "96%", height: "70%", position: "fixed", zIndex: zIndexSearch() + 200, color: "black"
    },
    saveButton: {
        position: "fixed", opacity: 1, right: "30%", top: "90%", margin: "1%"
    },
    '&:hover': {
        opacity: 1.0,
    },
});


const Sample = styled.p<Style>`
    white-space: pre-wrap;
    overflow-wrap: word-wrap;
    line-height: ${props => props.height};
    font-size: ${props => props.fontSize}px;
    font-family: ${props => props.font};
    font-weight: ${props => props.fontWeight};
    position:relative;
`

const LeftDiv = styled.div`
    height:100%;
    width:94%;
    margin:3%;
    overflow-y: hidden;
    overflow-x: hidden;
`

const RightDiv = styled.div`
    position:relative;
    width:90%;
    top:3%;
    overflow-x: hidden;
    margin 2%;
`

let Dropdown = (props, ref) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const confRef = useRef();

    const fontSize = 18
    const height = 1.8
    const font = `游明朝, "Yu Mincho", YuMincho`
    const fontWeight = 150
    const init_splitWord: string[] = ["、", "。","」","』"]

    const init_color = {
        "fontColor": "rgba(200,200,200,.2)",
        "highlight": "rgba(0,0,0,1)",
        "modal": "rgba(240,240,250,1)",
        "shadow": "rgba(0,0,0,.5)",
        "backgroundModal": "rgba(240,240,250,1)"
    }

    const init_dammy = {
        fontSize: fontSize,
        height: height,
        font: font,
        fontWeight: fontWeight,
        color: init_color,
        splitWords: init_splitWord
    }

    const isOpen = props.isOpen;
    const [active, setActive] = useState<number>(1);
    const handleClick = e => {
        const index = parseInt(e.currentTarget.value, 0);
        if (index) {
            setActive(index);
        }
    };

    useImperativeHandle(ref, () => ({
        autoRenew: () => {
            chrome.storage.sync.get(["splt_styles"], async (result) => {
                if (!result) return
                const init: Style = result["splt_styles"];
                updateValue("", init, "")
            });
        }
    }));
    const [style, setStyle] = useState<Style>(init_dammy)

    useEffect(() => {
        if (style) {
            updateValue("", style, "")
        }
    }, [isOpen])

    useEffect(() => {
        updateValue("", style, "")
    }, [style])

    let unmounted = false;
    useEffect(() => {
        const f = async () => {
            await new Promise(r => setTimeout(r, 1000));
            if (!unmounted) {
                chrome.storage.sync.get(["splt_styles"], async (result) => {
                    if (!result) { updateValue("", init_dammy, "") }
                    else {
                        const init: Style = await result["splt_styles"];
                        setStyle(init)
                        console.log(init)
                        updateValue("", init, "")
                    }
                });
            }
        };
        f();
        const cleanup = () => {
            unmounted = true;
            updateValue("", style, "");
        };
        return cleanup;
    }, [])

    const updateValue = (name: string, value: number | string | string[] | Style, type: string) => {
        dispatch({
            payload: {
                fontSize: style ? style.fontSize : fontSize,
                height: style ? style.height : height,
                color: style ? style.color : init_color,
                font: style ? style.font : font,
                fontWeight: style ? style.fontWeight : fontWeight,
                splitWords: style ? style.splitWords : init_splitWord
            },
            type: "SET_STYLE"
        })
    }

    const styleChange = useCallback((
        name: string,
        newValue: number | string | string[] | Style,
        type: string
    ) => {
        if (name === "fontSize") {
            setStyle({ ...style, fontSize: newValue as number })
        } else if (name === "height") {
            setStyle({ ...style, height: newValue as number })
        } else if (name === "font") {
            setStyle({ ...style, font: newValue as string })
        } else if (name === "fontWeight") {
            setStyle({ ...style, fontWeight: newValue as number })
        } else if (name === "color") {
            const colorPart = { ...style.color }
            colorPart[type] = newValue as string
            setStyle({ ...style, color: colorPart })
        } else if (name === "splitWords") {
            setStyle({ ...style, splitWords: newValue as string[] })
        } else {
            const init = newValue as Style
            setStyle(init)
        }
    }, [style]);

    const ColorStyle = () => {
        return (
            <>
                <Grid container spacing={10} >
                    <Grid item >
                        <div>
                            <Typography id="Blur Color" gutterBottom>
                                Blur Color
                            </Typography>
                            <Grid item xs={1}>
                                <ColorPicker
                                    dispatchColor={(color: string) => {
                                        styleChange("color", color, "fontColor")
                                    }}
                                    initial={
                                        style.color ? style.color.fontColor : init_color["fontColor"]
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item>
                        <div>
                            <Typography id="Focus Color" gutterBottom>
                               Focus Color
                            </Typography>
                            <Grid item xs={1}>
                                <ColorPicker
                                    dispatchColor={(color: string) => {
                                        styleChange("color", color, "highlight")
                                    }}
                                    initial={
                                        style.color ? style.color.highlight: init_color["highlight"]
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item >
                        <div>
                                <Typography id="Text Shadow" gutterBottom>
                                    Text Shadow
                                </Typography>
                                <Grid item xs={1}>
                                    <ColorPicker
                                        dispatchColor={(color: string) => {
                                            styleChange("color", color, "shadow")
                                        }}
                                        initial={
                                            style.color ? style.color.shadow : init_color["shadow"]
                                        }
                                    />
                                </Grid>
                        </div>
                    </Grid>
                    <Grid item >
                        <div>
                            <Typography id="Textarea Modal" gutterBottom>
                                Textarea Modal 
                            </Typography>
                            <Grid item xs={1}>
                                <ColorPicker
                                    dispatchColor={(color: string) => {
                                        styleChange("color", color, "modal")
                                    }}
                                    initial={
                                        style.color ? style.color.modal : init_color["modal"]
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item>
                        <div>
                            <Typography id="Background Modal" gutterBottom>
                                Background Modal
                            </Typography>
                            <Grid item xs={1}>
                                <ColorPicker
                                    dispatchColor={(color: string) => {
                                        styleChange("color", color, "backgroundModal")
                                    }}
                                    initial={
                                        style.color ? style.color.backgroundModal : init_color["backgroundModal"]
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </>
        )
    }

    const TextStyle = () => {
        return (
            <>
                <Grid container spacing={4}>
                    <Grid item>
                        <Grid item xs={12}>
                            <Grid container spacing={4}>
                                <Grid item xs={1}>
                                    <FontSizeIcon fontSize="large" />
                                </Grid>
                                <Grid item xs={10}>
                                    <Slider
                                        defaultValue={style
                                            ? style.fontSize
                                            : fontSize}
                                        min={6} max={50} step={0.5}
                                        onChangeCommitted={(e, value: number) =>
                                            styleChange("fontSize", value, "_")
                                        }
                                        aria-labelledby="continuous-slider"
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={4}>
                                <Grid item xs={1}>
                                    <LineWeightIcon fontSize="default" />
                                </Grid>
                                <Grid item xs={10}>
                                    <Slider
                                        defaultValue={
                                            style
                                                ? style.fontWeight
                                                : fontWeight
                                        }
                                        min={10} max={900} step={10}
                                        onChangeCommitted={(e, value: number) =>
                                            styleChange("fontWeight", value, "_")
                                        }
                                        aria-labelledby="continuous-slider"
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={4} >
                                <Grid item xs={1}>
                                    <HeightIcon fontSize="large" />
                                </Grid>
                                <Grid item xs={10}>
                                    <Slider
                                        step={0.1}
                                        defaultValue={style ? style.height : height}
                                        min={1}
                                        max={3}
                                        onChangeCommitted={(e, value: number) =>
                                            styleChange("height", value, "_")
                                        }
                                        aria-labelledby="continuous-slider" />
                                </Grid>
                            </Grid>

                            <Grid container spacing={4} >
                                <Grid item>
                                    <InputLabel htmlFor="grouped-native-select"
                                    >
                                        Font
                                    </InputLabel>
                                    <Select native
                                        value={style ? style.font : font}

                                        onChange={(e) => {
                                            styleChange("font", e.target.value as string, "_")
                                        }}
                                        id="grouped-native-select"
                                    >
                                        <optgroup label="ALL PC">
                                            <option
                                                value={`Arial, arial`}
                                            >
                                                デフォルト
                                            </option>
                                            <option
                                                value={`游明朝, "Yu Mincho", YuMincho`}
                                            >
                                                游明朝体
                                            </option>
                                            <option
                                                value={`"Yu Gothic Medium, 游ゴシック Medium"`}

                                            >
                                                游ゴシック Medium
                                            </option>
                                            <option
                                                value={`"メイリオ"`}
                                            >
                                                メイリオ
                                            </option>
                                        </optgroup>
                                        <optgroup label="For MAC">
                                            <option
                                                value={"Hiragino Kaku Gothic Pro, ヒラギノ角ゴ Pro"}
                                            >ヒラギノ角ゴ Pro
                                            </option>
                                        </optgroup>
                                    </Select>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                
                    <Grid item xs={12}>
                        <Sample
                            height={style ? style.height : height}
                            fontSize={style ? style.fontSize : fontSize}
                            color={null}
                            font={style ? style.font : font}
                            fontWeight={style ? style.fontWeight : fontWeight}
                            splitWords={null}
                        >
                            This is config mode.<br />
                            SPLT is Proofreading tool.
                        </Sample>
                    </Grid>
                </Grid>
            </>
        )
    }

    return (
        <div className={classes.root} ref={confRef}>
            <LeftDiv>
                <Tabs>
                    <Tab onClick={handleClick} active={active === 1} value={"1"}>
                        TEXT
                    </Tab>
                    <Tab onClick={handleClick} active={active === 2} value={"2"}>
                        COLOR
                    </Tab>
                    <Tab onClick={handleClick} active={active === 3} value={"3"}>
                        SPLIT WORD
                    </Tab>
                    <Tab onClick={handleClick} active={active === 4} value={"4"}>
                       HELP
                    </Tab>
                </Tabs>
                <ScrollBar>
                    <Content active={active === 1}>
                        <TextStyle />
                    </Content>
                    <Content active={active === 2}>
                        <ColorStyle />
                    </Content>
                    <Content active={active === 3}>
                        <TagsForm 
                            dispatchSplit={
                                (tags: string[]) => {
                                    styleChange("splitWords", tags, "_")
                            }}
                            splitSymbol={style.splitWords?style.splitWords:init_splitWord}
                        />
                    </Content>
                    <Content active={active === 4}>
                        <Help />
                    </Content>
                </ScrollBar>
            </LeftDiv>

            <RightDiv>
                <Button
                    variant="contained"
                    color="default"
                    className={classes.saveButton}
                    onClick={() => {
                        chrome.storage.sync.set({ splt_styles: style }, () => {
                            console.log("save");
                            console.dir(style)
                            updateValue("", style, "")
                        })
                    }}
                >
                    SAVE
                </Button>
            </RightDiv>
        </div >
    )
}

Dropdown = forwardRef(Dropdown);
export default Dropdown;