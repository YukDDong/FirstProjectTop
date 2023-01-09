const express = require('express')
const app = express()
const port = 5000
const { User } = require('./models/User')
const bodyParser=require('body-parser')
const config=require('./config/key')
const cookieParser=require('cookie-parser')
const { auth }=require('./middleware/auth')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())


const mongoose=require('mongoose')

//strictQuery Error로 추가한 문장 Error시에 false나 true중 Error가 없어지는 쪽으로 하면 된다고함.
mongoose.set('strictQuery', false);

mongoose.connect(config.mongoURI,{}).then(()=>console.log('MongoDB Connected...'))
.catch(err=>console.log(err))



app.get('/api/hello', (req, res)=>{
  res.send('안녕하세요')
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/user/register', (req, res)=>{
  //회원가입시 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다
  const user=new User(req.body)

  user.save((err, userInfo)=>{
    if(err) return res.json({success: false, err})

    return res.status(200).json({
      success: true
    })
  })
})


app.post('/api/user/login', (req, res)=>{
  //요청된 이메일을 DB에서 있는지 찾는다.
  User.findOne({email: req.body.email}, (err, user)=>{
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    // 요청된 이메일이 있다면 비밀번호가 맞는 비밀번호인지 확인.
    user.comparePassword(req.body.password, (err, isMatch)=>{
      if(!isMatch) return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다."
      })


      // 비밀번호까지 맞다면 토큰을 생성
      user.generateToken((err, user)=>{
        if(err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에 ? 쿠키,로컬스토리지
        res.cookie("x_auth", user.token)
        .status(200)
        .json({loginSuccess: true, userId: user._id})
      })
    })
  })
})


// Auth 기능 구현
app.get('/api/user/auth', auth ,(req, res)=>{
  // 여기까지 미들웨어를  통과해 홨다는건 인증이 되었다는 뜻임!
  res.status(200).json({
    _id: req.user._id,
    // role 0 => 일반유저, 0 이 아니면 관리자
    isAdmin: req.user.role=== 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('/api/user/logout', auth ,(req, res)=>{
  User.findOneAndUpdate({_id: req.user._id},{ token: ""}, (err, user)=>{
    if(err) return res.json({success: false, err})
    return res.status(200).send({success: true})
  })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})