import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

const get_user_id_by_email = async (email: string | null | undefined) => {
  let user_id;
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    user_id = doc.id;
  });

  return user_id;
};

export { get_user_id_by_email };
