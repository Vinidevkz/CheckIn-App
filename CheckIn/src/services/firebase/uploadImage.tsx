import { storage } from "./index";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImageToFirebase = async (imageUri: string) => {
  try {
    console.log("Iniciando o upload da imagem...");

    // Fazendo fetch da imagem
    const response = await fetch(imageUri);

    if (!response.ok) {
      console.error("Erro ao buscar imagem:", response);
      return null;
    }

    const blob = await response.blob(); // Convertendo a imagem para Blob
    console.log("Tamanho do arquivo:", blob.size);

    // Gerar um nome único para o arquivo
    const filename = `image_${new Date().getTime()}.jpg`; // Nome do arquivo com timestamp
    const storageRef = ref(storage, `images/${filename}`);
    console.log("Referência do storage: ", storageRef); // Criar uma referência no Firebase Storage

    console.log("Fazendo o upload para o Firebase...");
    // Fazendo o upload para o Firebase Storage
    await uploadBytes(storageRef, blob);

    // Obter a URL pública da imagem após o upload
    console.log("Obtendo a URL pública da imagem...");
    const downloadURL = await getDownloadURL(storageRef);
    console.log("URL do arquivo no Firebase Storage:", downloadURL);

    return downloadURL; // Retornando a URL pública da imagem
  } catch (error: any) {
    // Tratamento de erro mais detalhado
    if (error instanceof Error) {
      console.error("Erro ao enviar imagem:", error.message); // Exibindo a mensagem do erro
    } else {
      console.error("Erro desconhecido:", error);
    }
    return null;
  }
};
