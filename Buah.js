const SqlString = require("mysql/lib/protocol/SqlString");
const db = require("./db");

let buahbuahan = [
    { namabuah: "semangka", warna: "merah", bentuk: "bulat", jenis: "cucurbitacea", create: new Date() },
    { namabuah: "pisang", warna: "kuning", bentuk: "melengkung", jenis: "musacea", create: new Date() },
    { namabuah: "anggur", warna: "hijau", bentuk: "bulat", jenis: "vitacea", create: new Date() },
  ];

const cari = (arrData, namabuah) => {
  ketemu = -1;
  indeks = 0;
  while (ketemu == -1 && indeks < arrData.length) {
    if (arrData[indeks].namabuah == namabuah) {
      ketemu = indeks;
      return indeks;
    }
    indeks++;
  }
  return -1;
};

module.exports = {
  insert: (buahbuahan, result) => {
    db.query("INSERT INTO buahbuahan SET ?", buahbuahan, (err, res) => {
      if (err) {
        console.log("error:", err);
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...buahbuahan });
    });
  },
  getBuah(result) {
    let query = "SELECT * FROM buah";
    db.query(query, (err, res) => {
      if (err) {
        console.log("error:", err);
        return;
      }
      result(null, res);
    });
  },
  getBuahByWarna: (namabuah, result) => {
    db.query(`SELECT * FROM mahasiswa WHERE namabuah = ${warna}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("buah ditemukan:", res[0]); //opsi
        result(null, res[0]);
        return;
      }
      result({ kind: "tidak ditemukan" }, null);
    });
  },
  getBuahByjenis: (Buah, result) => {
    try {
      Sql.query(
        `SELECT namabuah.kdNB,namabuah.namabuah,warna.jenis,bentuk.
                      FROM ,buahbuahan,warna
                      WHERE buahbuahan.warna=${warna} and warna.jenis=${warna}and jenis.k=matakuliah.kdNB`,
        (err, res) => {
          result(null, res);
        }
      );
    } catch (error) {
      result(error, null);
    }
  },

  update: (nim, mahasiswa, result) => {
    db.query("UPDATE buahbuahan SET nama= ?, warna=?, bentuk=? WHERE jenis=?", [buahbuahan.nama, buahbuahan.jenis, buahbuahan.bentuk, warna], (err, res) => {
      if (err) {
        console.log("error:", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("update buahbuahan: ", { warna: warna, ...buahbuahan });
      result(null, { warna: warna, ...buahbuahan });
    });
  },

  delete: (warna, result) => {
    db.query("DELETE FROM buahbuahan WHERE nim = ?", warna, (err, res) => {
      if (err) {
        console.log("error:", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted buahbuahan with warna : ", namabuah);
      result(null, res);
    });
  },
};


