
# Offline Video Mülakat Platformu

Proje Açıklaması
Kullanıcıların offline bir şekilde video mülakat yapmasını sağlayan bir platformdur.
Bu projede:

- **Admin**, soru paketleri ve mülakatları oluşturabilir.
- Kullanıcılar mülakat linkleri üzerinden video cevaplarını kaydedebilir.
- Video kayıtları **S3** üzerinde depolanır.
- JSON Web Token (JWT) ile kimlik doğrulama yapılır.
- **MongoDB** kullanılarak veri saklama işlemleri gerçekleştirilir.

## Kullanılan Teknolojiler
- **Node.js** ve **Express.js**: RESTful API geliştirme.
- **TypeScript**: Tip güvenliği ve geliştirme kolaylığı için.
- **MongoDB**: NoSQL veritabanı.
- **S3**: Video dosyalarının saklanması için.
- **JWT**: Kimlik doğrulama.

## Kurulum Talimatları

### 1. Gerekli Yazılımlar
- [Node.js](https://nodejs.org/) (v14 veya üzeri)
- [MongoDB](https://www.mongodb.com/)
- Bir paket yöneticisi: **npm** veya **yarn**

### 2. Depoyu Klonlayın
```bash
git clone https://github.com/fatmanur38/backendRTW.git
cd backendRTW
```
### 3. Bağımlılıkları Yükleyin
```bash
npm install
```

### 4. Ortam Değişkenlerini Ayarlayın

- Kök dizinde bir .env dosyası oluşturun ve şu bilgileri doldurun:

`MONGO_URL`=mongodb+srv://<kullanıcı_adı>:<şifre>@<cluster_url>/<veritabanı_adı>

`FRONTEND_URL`=http://localhost:5173

`USER_FRONTEND_URL`=http://localhost:5174

`JWT_SECRET`=your_jwt_secret_key

`PORT`=4000
#### Admin bilgileri

`MASTER_ADMIN_EMAIL`=admin@example.com

`MASTER_ADMIN_PASSWORD`=admin@example.com

`SECRET_KEY`=mysecretkey
#### S3 yapılandırması

`S3_UPLOAD_URL`=<s3_upload_url>

`PROJECT_NAME`=<project_name>

`BUCKET_NAME`=<bucket_name>

`ACCESS_KEY`=<s3_access_key>

`NODE_ENV`=local

### 5. Projeyi Başlatın

```bash
npm run dev
```
  
## API Kullanımı

### Auth İşlemleri

| Endpoint | Metot     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `/api/auth/login` | `POST` | Admin giriş işlemi |
| `/api/auth/logout` | `POST` | Admin çıkış yapma işlemi |

### Soru Paketleri

| Endpoint | Metot     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `/api/question-packages/` | `POST` | Soru paketi oluşturma |
| `/api/question-packages/` | `GET` | Soru paketlerini getirme |
| `/api/question-packages/:id` | `GET` | ID'ye göre soru paketi getirme |
| `/api/question-packages/:id` | `DELETE` | ID'ye göre soru paketi silme |
| `/api/question-packages/:id` | `PUT` | ID'ye göre soru paketi güncelleme |

### Mülakatlar

| Endpoint | Metot     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `/api/interviews` | `POST` | Mülakat oluşturma |
| `/api/interviews` | `GET` | Mülakatları getirme |
| `/api/interviews/:interviewId` | `GET` | ID'ye göre Mülakat getirme |
| `/api/interviews/:interviewId` | `PUT` | ID'ye göre mülakat güncelleme |
| `/api/interviews/:interviewId` | `DELETE` | ID'ye göre mülakat silme |
| `/api/interviews/:interviewId/users` | `PUT` | Mülakata user ekleme |
| `/api/interviews/link/:link` | `GET` | Mülakatı video linkine göre getirme |

### Kullanıcı İşlemleri

| Endpoint | Metot     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `/api/users` | `POST` | Yeni kullanıcı oluşturma |
| `/api/users/:id` | `GET` | ID'ye göre Kullanıcıyı çekme |
| `/api/users` | `GET` | Tüm kullanıcıları çekme |
| `/api/users/:id` | `PUT` | ID'ye göre kullanıcıyı güncelleme |
| `/api/users/:id/video-url` | `PUT` | Kullanıcı video URL'sini güncelleme |


### Video Yükleme

| Endpoint | Metot     | Açıklama                |
| :-------- | :------- | :------------------------- |
| `/api/s3/upload` | `POST` | s3' e video yükleme |
| `/api/s3/videos` | `GET` | s3' ten video çekme |
| `/api/s3/videos/:id` | `GET` | ID'ye göre s3' ten video çekme |
| `/api/s3/videos/:id` | `DELETE` | ID'ye göre s3' ten video silme |


