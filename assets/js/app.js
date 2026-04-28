function app() {

  return {

    loading: false,

    form: {

      nama: "",
      nim: "",
      ktp: "",
      alamat: "",
      kelurahan: "",
      tempatlahir: "",
      tanggallahir: "",
      kelamin: "Laki-Laki",
      agama: "Islam",

      namasekolah: "",
      jurusan: "",
      alamatsekolah: "",
      jenjangpend: "S1",

      jenis: "Magang",

      hp: "",

      tipe: "Perorangan",

      id_parent: "1",

      tanggal_mulai: "",
      tanggal_selesai: "",

      bagian: "Pelayanan Medik"

    },

    photoBase64: "",

    photoMimeType: "",

    documents: [],

    async handlePhoto(event) {

      const file = event.target.files[0];

      if (!file) return;

      if (file.size > CONFIG.MAX_PHOTO_SIZE) {

        alert("Foto terlalu besar");

        return;

      }

      this.photoMimeType = file.type;

      const reader = new FileReader();

      reader.onload = (e) => {

        this.photoBase64 =
          e.target.result.split(",")[1];

      };

      reader.readAsDataURL(file);

    },

    async handlePdf(event) {

      const files =
        Array.from(event.target.files);

      this.documents = [];

      let totalSize = 0;

      for (const file of files) {

        totalSize += file.size;

        if (
          totalSize >
          CONFIG.MAX_TOTAL_PDF
        ) {

          alert(
            "Total PDF terlalu besar"
          );

          return;

        }

        const reader =
          new FileReader();

        reader.onload = (e) => {

          this.documents.push({

            name: file.name,

            base64:
              e.target.result
                .split(",")[1]

          });

        };

        reader.readAsDataURL(file);

      }

    },

    async submitForm() {

      this.loading = true;

      try {

        const payload = {

          ...this.form,

          umur:
            calculateAge(
              this.form.tanggallahir
            ),

          set_periode:
            calculatePeriod(
              this.form.tanggal_mulai,
              this.form.tanggal_selesai
            ),

          pasfoto:
            this.photoBase64,

          photoMimeType:
            this.photoMimeType,

          documents:
            this.documents

        };

        console.log(payload);

        const result =
          await sendData(payload);

        console.log(result);

        if (
          result.status === "success"
        ) {

          alert(
            "Data berhasil dikirim"
          );

          location.reload();

        } else {

          alert(
            result.message ||
            "Gagal submit"
          );

        }

      } catch(err) {

        console.error(err);

        alert(err.toString());

      }

      this.loading = false;

    }

  }

}
