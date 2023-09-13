import clientPromise from "@/db/clientPromise";

export default async function handler(req, res) {
  const { email, password } = req.body;

  // check user exists in db with existing email, if not return error, else create new one
  try {
    const client = await clientPromise;
    const db = await client.db("WebDB");
    const collection = await db.collection("Users");

    const result = await collection.insertOne({
      email,
      password,
    });

    if (result) {
      res.status(200).json({ message: "Success" });
    } else {
      res.status(400).json({ message: "User creation failed" });
    }
  } catch (e) {
    res.status(400).json({ message: "Failed" });
  }
}
