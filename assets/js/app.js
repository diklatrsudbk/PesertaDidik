document.addEventListener('alpine:init', () => {

    Alpine.data('app', () => ({

        /* =========================
           STATE
        ========================= */

        loading: false,

        progressText: '',

        photoPreview: null,

        kelompok: [],

        formData: {

            tipe: 'Perorangan',

            bagian: '',

            jenis: 'Magang',

            jenjangpend: 'S1',

            namasekolah: '',

            jurusan: '',

            alamatsekolah: '',

            id_parent: 1,

            tanggal_mulai: '',

            tanggal_selesai: '',

            nama: '',

            nim: '',

            ktp: '',

            hp: '',

            agama: 'Islam',

            kelamin: 'Laki-Laki',

            tempatlahir: '',

            tanggallahir: '',

            alamat: '',

            kelurahan: '',

            pasFotoData: '',

            dokumenList: []
        },

        /* =========================
           OPTIONS
        ========================= */

        options: {

            agama: [
                'Islam',
                'Kristen',
                'Protestan',
                'Katolik',
                'Hindu',
                'Budha',
                'Konghucu'
            ],

            kelamin: [
                'Laki-Laki',
                'Perempuan'
            ],

            bagian: [
                'Pelayanan Medik',
                'Penunjang Medik',
                'Umum'
            ],

            jenis: [
                'PKL',
                'PBL',
                'Resident',
                'Magang'
            ],

            jenjangpend: [
                'SMK',
                'D3',
                'S1',
                'S2',
                'Profesi'
            ]
        },

        /* =========================
           PHOTO
        ========================= */

        async handlePhoto(event) {

            const file = event.target.files[0];

            if (!file) return;

            if (file.size > CONFIG.MAX_PHOTO_SIZE) {
                alert('Ukuran foto maksimal 400KB');
                return;
            }

            const allowed = ['image/jpeg', 'image/png'];

            if (!allowed.includes(file.type)) {
                alert('Foto harus JPG atau PNG');
                return;
            }

            this.photoPreview = URL.createObjectURL(file);

            this.formData.pasFotoData = await fileToBase64(file);
        },

        /* =========================
           PDF
        ========================= */

        async handleFiles(event) {

            const files = Array.from(event.target.files);

            let totalSize = 0;

            this.formData.dokumenList = [];

            for (const file of files) {

                totalSize += file.size;

                if (totalSize > CONFIG.MAX_DOC_SIZE) {
                    alert('Total dokumen maksimal 4MB');
                    this.formData.dokumenList = [];
                    return;
                }

                if (file.type !== 'application/pdf') {
                    alert(file.name + ' bukan PDF');
                    continue;
                }

                const base64 = await fileToBase64(file);

                this.formData.dokumenList.push({
                    name: file.name,
                    base64: base64
                });
            }
        },

        /* =========================
           VALIDATION
        ========================= */

        validateForm() {

            if (!this.formData.nama) {
                alert('Nama wajib diisi');
                return false;
            }

            if (!this.formData.nim) {
                alert('NIM wajib diisi');
                return false;
            }

            if (!validateDates(
                this.formData.tanggal_mulai,
                this.formData.tanggal_selesai
            )) {

                alert('Tanggal selesai tidak valid');
                return false;
            }

            return true;
        },

        /* =========================
           SUBMIT
        ========================= */

        async handleSubmit() {

            if (!this.validateForm()) return;

            this.loading = true;

            this.progressText = 'Mengirim data...';

            try {

                const payload = {

                    ...this.formData,

                    targetSheet: CONFIG.TARGET_SHEET

                };

                const result = await submitData(payload);

                console.log(result);

                this.progressText = 'Berhasil dikirim';

                alert('Data berhasil dikirim');

                this.resetForm();

            } catch (error) {

                console.error(error);

                alert(error.message || 'Terjadi kesalahan');

            } finally {

                this.loading = false;

                this.progressText = '';
            }
        },

        /* =========================
           RESET
        ========================= */

        resetForm() {

            this.photoPreview = null;

            this.formData = {

                tipe: 'Perorangan',

                bagian: '',

                jenis: 'Magang',

                jenjangpend: 'S1',

                namasekolah: '',

                jurusan: '',

                alamatsekolah: '',

                id_parent: 1,

                tanggal_mulai: '',

                tanggal_selesai: '',

                nama: '',

                nim: '',

                ktp: '',

                hp: '',

                agama: 'Islam',

                kelamin: 'Laki-Laki',

                tempatlahir: '',

                tanggallahir: '',

                alamat: '',

                kelurahan: '',

                pasFotoData: '',

                dokumenList: []
            };
        }

    }));

});
