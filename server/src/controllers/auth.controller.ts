import { Request, Response } from "express";
import { supabase } from "../supabaseClient";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required"
      });
    }

    return res.json({
      success: true,
      message: "Login working"
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    return res.json({
      success: true,
      message: "Register working"
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};