import jwt from "jsonwebtoken";

export const generarJWT = (_id: string, name: string) => {
  return new Promise((resolve, reject) => {
    const payload = { _id, name };
    let secret: string = process.env.SECRET_JWT_SEED || "";
    jwt.sign(
      payload,
      secret,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }

        resolve(token);
      }
    );
  });
};
