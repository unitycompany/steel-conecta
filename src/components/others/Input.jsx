import React from "react";
import styled from "styled-components";

const Question = styled.label`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 6px;
    padding: 4px 0;
`

const Text = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 6px;

    & span {
        font-size: 20px;
        font-weight: 500;
        color: ${(props) => props.theme.color.primary['basic']};
        line-height: 1;

        @media (max-width: 768px){
            font-size: 18px;
        }
    }
`

const Label = styled.h4`
    font-size: 18px;
    font-weight: 500;

    @media (max-width: 768px){
        font-size: 16px;
    }
`

const Field = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2px;
    padding: 10px 0;

    & span {
        width: 100%;
        font-size: 12px;
        color: ${(props) => props.theme.color.gray['basic']};
    }
`

const InputField = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    & input {
        flex: 1;    
        border: none;
        padding: 8px 0px;
        font-size: 18px;
        color: ${(props) => props.theme.color.black[500]};
        font-weight: 500;

        @media (max-width: 768px){
            width: 100%;
            font-size: 16px;
        }

        &:focus {
            outline: none;
        }

        &::placeholder{
            font-size: 18px;
            color: ${(props) => props.theme.color.gray['basic']};
            opacity: 0.4;

            @media (max-width: 768px){
                font-size: 18px;
            }
        }
    }

    & button {
        background: ${(props) => props.theme.color.primary['basic']};
        color: ${(props) => props.theme.color.white['basic']};
        border-radius: 6px;
        border: none;
        padding: 6px 10px;
        cursor: pointer;
    }

    & div {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;

        & span {
            font-size: 12px;
            color: ${(props) => props.theme.color.gray['basic']};

            @media (max-width: 768px){
                font-size: 10px;
            }
        }

        & h4 {
            white-space: nowrap;
            font-weight: 600;

            @media (max-width: 768px){
                font-size: 14px;
            }
        }
    }
`

const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: #00000020;
`    

export default function Input({
    questionNumber,
    children,
    questionData,
    typeInput,
    idInput,
    placeholderInput,
    value = "",
    onChange = () => {},
    locked = false,
    isCurrent = false,
    onNext = () => {}
}) {

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            // if locked, ignore
            if (locked) return;
            // rely on browser validation via checkValidity when available
            const target = e.target;
            if (target && typeof target.checkValidity === "function") {
                if (target.checkValidity()) {
                    e.preventDefault();
                    // blur current to ensure focus can move
                    try { target.blur(); } catch (err) {}
                    onNext();
                } else {
                    // show native validation message
                    try { target.reportValidity(); } catch (err) {}
                }
            } else {
                // fallback: if there's any value, proceed
                if (value && value.toString().trim() !== "") {
                    e.preventDefault();
                    try { target.blur(); } catch (err) {}
                    onNext();
                }
            }
        }
    }

    return (
        <>
            <Question style={{ opacity: locked ? 0.15 : 1 }}>
                <Text>
                    <span>{questionNumber}</span>
                    <Label 
                        dangerouslySetInnerHTML={{ __html: children }}
                    />
                </Text>
                <Field>
                    <span>{questionData}</span>
                    <InputField>
                        <input
                            type={typeInput}
                            id={idInput}
                            placeholder={placeholderInput}
                            required
                            value={value}
                            onChange={onChange}
                            onKeyDown={handleKeyDown}
                            disabled={locked}
                        />
                        {isCurrent ? (
                            <button
                                type="button"
                                onClick={() => {
                                    // validate input before moving on - show native message when invalid
                                    const el = document.getElementById(idInput);
                                    if (el && typeof el.checkValidity === "function") {
                                        if (el.checkValidity()) {
                                            try { el.blur(); } catch (err) {}
                                            onNext();
                                        } else {
                                            try { el.reportValidity(); } catch (err) {}
                                        }
                                    } else {
                                        if (value && value.toString().trim() !== "") {
                                            try { el && el.blur(); } catch (err) {}
                                            onNext();
                                        }
                                    }
                                }}
                            >Enviar</button>
                        ) : null}
                        <div>
                            <span>press</span>
                            <h4>Enter ↵</h4>
                        </div>
                    </InputField>
                    <Line></Line>
                </Field>
            </Question>
        </>
    )
}