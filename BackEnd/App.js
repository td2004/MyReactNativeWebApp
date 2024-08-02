export async function getDataFromDB(db) {
  
    const userDocRef = db.collection('contacts').doc('example');
  
    try {
        const doc = await userDocRef.get(); 
        if (!doc.exists) {
            console.log('Document not found!');
            return null; 
        } else {
            return doc.data();
        }
    } catch (error) {
        console.error('Error getting document:', error);
        throw error;
    }
  }
  
  export async function saveDataToDB (db, userData) {
    try {
      const docRef = await db.collection('contacts').add(userData);
      console.log('Document written with ID: ', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error saving document:', error);
      throw error; 
    }
  }
  
  
  