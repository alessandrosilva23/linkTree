import { FormEvent, useState, useEffect } from "react"
import { Header } from "../components/Header"
import { Input } from "../components/input"
import { FiTrash } from "react-icons/fi"
import { db } from "../../services/firebaseConnection"
import { addDoc, collection, onSnapshot, orderBy,doc,deleteDoc, query  } from "firebase/firestore"


interface LinkProps{
    id:string;
    name:string;
    url: string;
    bg: string;
    color: string;
}

export function Admin(){
 
    const [nameInput, setNameInput] = useState('')
    const [urlInput,setUrlInput] = useState('')
    const [textColor, setTextColor] = useState('#F1F1F1')
    const [backgroundInput, setBackgroundInput] = useState('#121212')
    const [links, setLinks] = useState<LinkProps[]>([])
    useEffect(()=>{

        const linksRef = collection(db, 'links');
        const queryRef = query(linksRef, orderBy('created','asc'))
        const unsub = onSnapshot(queryRef,(snapshot)=>{
            let lista = [] as LinkProps[];
            snapshot.forEach((doc)=>{
                lista.push({
                    id:doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
            })

            setLinks(lista)

        })

        return () =>{
            unsub()
        }

    },[])

    async function handleRegister(event:FormEvent){
        event.preventDefault();
        if(nameInput === '' || urlInput ===''){
            alert('Preencha os campos')
            return;
        }

        addDoc(collection(db,'links'),{
            name:nameInput,
            url: urlInput,
            bg:backgroundInput,
            color: textColor,
            created: new Date()
        })
        .then(()=>{
            setNameInput('')
            setUrlInput('')
            console.log('Cadastrado com sucesso')
        })
        .catch((error)=>{
            console.log(error)
        })
    }

   async function handleDeleteLink(id:string){

    const docRef = doc(db, 'links',id)
    await deleteDoc(docRef)

    }

    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>

            <form className="flex flex-col mt-3 mb-3 w-full max-w-xl" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-8 mb-2">Nome do Link</label>
                <Input
                    placeholder="Digite o nome do link"    
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                />
                
                <label className="text-white font-medium mt-8 mb-2">URL</label>
                <Input
                    type="url"
                    placeholder="Digite a URL"    
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                />

                <section className="flex my-4 gap-5">

                    <div className=" flex gap-2">
                         <label className="text-white font-medium mt-2 mb-2">Cor do link</label>
                         <input 
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                         />

                         <label className="text-white font-medium mt-2 mb-2">Fundo do link</label>
                         <input 
                            type="color"
                            value={backgroundInput}
                            onChange={(e) => setBackgroundInput(e.target.value)}
                         />
                    </div>
                </section>

                {nameInput !== '' &&(
                    <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md ">
                    <label className="text-white font-medium mt-2 mb-3">Veja como está ficando</label>
                    <article className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
                    style={{marginBottom: 8, marginTop:8, backgroundColor:backgroundInput}}
                    >
                        <p
                        className="font-medium"
                        style={{color:textColor}}>
                            {nameInput}
                        </p>
                    </article>
                    </div>
                )}

                <button 
                    className="bg-blue-600 h-9 rounded-md       text-white font-medium gap-4 flex justify-center items-center"
                    type="submit"
                >
                    Cadastrar
                </button>
            </form>

            <h2 className="font-bold text-white mb-4 text-xl">Meus Links</h2>
          
           {links.map((link) => (
             <article 
             key={link.id}
             className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 mb-2 select-none px-2"
             style={{backgroundColor: link.bg, color:link.color}}
             >
                 <p>{link.name}</p>
                 <div>
                     <button 
                        onClick={()=> handleDeleteLink(link.id)}
                        className="border border-dashed py-1 px-2 rounded bg-stone-900">
                         <FiTrash size={18} color="white"/>
                     </button>
                 </div>
             </article>
           ))}

        </div>
    )
}