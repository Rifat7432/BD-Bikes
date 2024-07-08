import { z } from "zod";

export const ProductResolverSchema = z.object({
  name: z.string({ required_error: "This field required" }),
  imageUrl: z.any({ required_error: "This field required" }),
  price: z.string({ required_error: "This field required" }),
  quantity: z.string({ required_error: "This field required" }),
  releaseDate: z.any({ required_error: "This field required" }),
  brand: z.string({ required_error: "This field required" }),
  model: z.string({ required_error: "This field required" }),
  type: z.enum(["road", "mountain", "hybrid"]),
  size: z.string({ required_error: "This field required" }),
  color: z.string({ required_error: "This field required" }),
  material: z.string({ required_error: "This field required" }),
  suspensionType: z.string({ required_error: "This field required" }),
  customAttributes: z.string({ required_error: "This field required" }),
});
export const ProductUpdateResolverSchema = z.object({
  name: z.string().optional(),
  imageUrl: z.any().optional(),
  price: z.string().optional(),
  quantity: z.string().optional(),
  releaseDate: z.any().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  type: z.enum(["road", "mountain", "hybrid"]).optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  material: z.string().optional(),
  suspensionType: z.string().optional(),
  customAttributes: z.string().optional(),
});

export const LoginResolverSchema = z.object({
  username: z.string({ required_error: "This field required" }),
  password: z.string({ required_error: "This field required" }),
});
export const SignUpResolverSchema = z.object({
  username: z.string().min(1),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" }),
  email: z.string().email(),
  role: z.enum(["buyer", "seller"]),
});
export const serviceRequestResolverSchema = z.object({
  servicingPrice: z.number({ required_error: "This field required" }),
  serviceDetails: z
    .array(z.string({ required_error: "This field required" }))
    .nonempty(),
  lastServicingDate: z.any({ required_error: "This field required" }),
  nextServicingDate: z.any({ required_error: "This field required" }),
});
