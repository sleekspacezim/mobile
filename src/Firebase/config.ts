import { initializeApp, getApp, getApps } from "firebase/app";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import {
  firebaseApiKey,
  firebaseAppId,
  firebaseAuthDomain,
  firebaseBucketName,
  firebaseMeasurementId,
  firebaseMessagingSenderId,
  firebaseProjectId,
  firebaseStorageBucket,
} from "../Utils/Constants";
import { generateRandomSixDigitNumber } from "../Utils/Funcs";

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  projectId: firebaseProjectId,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: firebaseMessagingSenderId,
  appId: firebaseAppId,
  measurementId: firebaseMeasurementId,
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}
const firebaseApp = getApp();
const firebaseStorage = getStorage();

const getFileName = (uri: string) => {
  return generateRandomSixDigitNumber() + uri.split("/").pop();
};

const getFileType = (contentType: string | undefined) => {
  if (contentType) {
    return contentType.split("/")[0];
  } else {
    return undefined;
  }
};

const uploadFileToFirebase: (uri: string) => Promise<{
  uri: string;
  name: string;
  fullPath: string;
  contentType: string | undefined;
  size: number;
  fileType: string | undefined;
}> = async (uri: string) => {
  const blobResponse = await fetch(uri);
  const fileBlob = await blobResponse.blob();
  const fileName = getFileName(uri);

  const fileRef = ref(getStorage(), `${firebaseBucketName}/${fileName}`);
  const uploadTask = uploadBytesResumable(fileRef, fileBlob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          uri: downloadUrl,
          name: uploadTask.snapshot.metadata.name,
          fullPath: uploadTask.snapshot.metadata.fullPath,
          contentType: uploadTask.snapshot.metadata.contentType,
          size: uploadTask.snapshot.metadata.size,
          fileType: getFileType(uploadTask.snapshot.metadata.contentType),
        });
      }
    );
  });
};

const deleteFileFromFirebase = async (fullPath: string) => {
  const desertRef = ref(getStorage(), fullPath);

  return new Promise((resolve, reject) => {
    deleteObject(desertRef)
      .then(() => {
        resolve({
          success: true,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const updateFileFileInFirebase = async (fullPath: string, uri: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      await deleteFileFromFirebase(fullPath);
      const imageData = await uploadFileToFirebase(uri);
      resolve(imageData);
    } catch (error) {
      reject(error);
    }
  });
};

export {
  firebaseApp,
  firebaseStorage,
  uploadFileToFirebase,
  deleteFileFromFirebase,
  updateFileFileInFirebase,
};
