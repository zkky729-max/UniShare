import { Router } from "express"
import bcrypt from "bcryptjs"

import { supabase } from "../lib/supabase"
import { generateToken } from "../utils/jwt"

const router = Router()

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body

    // تحقق من البيانات
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      })
    }

    // التحقق إذا الإيميل موجود
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single()

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      })
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10)

    // إنشاء المستخدم
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          username,
          email,
          password: hashedPassword
        }
      ])
      .select()

    if (error) {
      return res.status(400).json({
        message: error.message
      })
    }

    return res.status(201).json({
      message: "User created successfully",
      user: data
    })

  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: "Server error"
    })
  }
})

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // تحقق من البيانات
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      })
    }

    // البحث عن المستخدم
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single()

    // إذا المستخدم غير موجود
    if (error || !user) {
      return res.status(401).json({
        message: "Invalid credentials"
      })
    }

    // مقارنة كلمة المرور
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    )

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid credentials"
      })
    }

    // إنشاء JWT
    const token = generateToken(user.id.toString())

    return res.json({
      message: "Login successful",
      token,

      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    })

  } catch (error) {
    console.error(error)

    return res.status(500).json({
      message: "Server error"
    })
  }
})

export default router