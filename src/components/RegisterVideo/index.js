import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js";

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

const PROJECT_URL = "https://uaoclocitstvoyezvrdg.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhb2Nsb2NpdHN0dm95ZXp2cmRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxODAwODAsImV4cCI6MTk4Mzc1NjA4MH0.MpsZdvCUxrf03C6VUXEhTxcE06lqRGuNxPdkQFo8qAA"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

// get youtube thumbnail from video url
function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "Frost punk" , url: "https://youtube.." }
    });
    const [formVisivel, setFormVisivel] = React.useState(true);

    console.log();

    return (
        <StyledRegisterVideo>
            <button type="button" className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {/* {Ternário} */}
            {/* {Operadores de Curto-circuito} */}
            {formVisivel
            ? (
                            <form onSubmit={(evento) => {
                                    evento.preventDefault();
                                    console.log(formCadastro.values);

                                    // Contrato entre o nosso Front e o BackEnd
                                    supabase.from("video").insert({
                                        title: formCadastro.values.titulo,
                                        url: formCadastro.values.url,
                                        thumb: getThumbnail(formCadastro.values.url),
                                        playlist: "jogos",
                                    })
                                    .then((oqueveio) => {
                                        console.log(oqueveio);
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    })

                                    setFormVisivel(false);
                                    formCadastro.clearForm();
                                }}>
                                <div>
                                <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                    X
                                </button>
                                <input 
                                    placeholder="Titulo do vídeo" 
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
