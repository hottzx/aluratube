import React from "react";
import { StyledRegisterVideo } from "./styles";


// Custom Hook
function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values,
        handleChange: (evento) => {
                 console.log(evento.target);
                const value = evento.target.value;
                const name = evento.target.name
                setValues({
                    ...values,
                    [name]: values,
                });
        },
        clearForm() {
            setValues({})
        }
    };
}


export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "Frost punk" , url: "https://youtube.." }
    });
    const [formVisivel, setFormVisivel] = React.useState(true);




    return (
        <StyledRegisterVideo>
            <button type="button" className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {formVisivel
            ? (
                            <form onSubmit={(evento) => {
                                    evento.preventDefault();
                                    console.log(formCadastro.values);
                                    setFormVisivel(false);
                                    formCadastro.clearForm();
                                }}>
                                <div>
                                <button className="close-modal" onClick={() => setFormVisivel(false)}>
                                    X
                                </button>
                                <input 
                                    placeholder="Titulo deo vídeo" 
                                    name="titulo"
                                    values={formCadastro.values.titulo} 
                                    onChange={formCadastro.handleChange} 
                                />
                                <input 
                                 placeholder="URL"
                                 name="url"
                                 values={formCadastro.values.url} 
                                 onChange={formCadastro.handleChange} 
                                 />
                                <button type="submit">
                                    Cadastrar
                                </button>
                                </div>
                            </form>
            )
        : false}
        </StyledRegisterVideo>
    )   
}
