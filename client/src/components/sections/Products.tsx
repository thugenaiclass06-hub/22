import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import productImg1 from "@assets/Gemini_Generated_Image_351mrg351mrg351m_1764781526276.png";
import productImg2 from "@assets/generated_images/travel_size_cosmetic_tube.png";
import productImg3 from "@assets/generated_images/cosmetic_gift_set_box.png";

// Fallback images if generated ones aren't ready immediately, 
// though in this flow they should be. 
// We'll use the main product image as fallback for others if needed in a real app, 
// but here we assume generation works.

const products = [
  {
    id: 1,
    name: "NUWE 輕透素顏霜 (經典款)",
    price: "NT$ 880",
    image: productImg1,
    tag: "熱銷 TOP 1",
    description: "30ml 經典容量。一抹提亮，打造如雲朵般輕盈的偽素顏妝感。富含保濕成分，妝養合一，讓肌膚整天水潤透氣。",
    details: [
      "容量：30ml",
      "防曬係數：SPF 50+ PA++++",
      "適用膚質：全膚質適用，特別推薦敏感肌",
      "使用方法：保養後，取適量均勻塗抹於全臉"
    ]
  },
  {
    id: 2,
    name: "NUWE 輕透素顏霜 (旅行版)",
    price: "NT$ 350",
    image: productImg2,
    tag: "便攜首選",
    description: "10ml 輕巧包裝。小巧好攜帶，隨時隨地補妝，保持完美氣色。適合旅行、出差或隨身攜帶。",
    details: [
      "容量：10ml",
      "防曬係數：SPF 50+ PA++++",
      "特色：真空按壓瓶設計，不僅衛生更能用盡最後一滴"
    ]
  },
  {
    id: 3,
    name: "NUWE 雲朵光感禮盒",
    price: "NT$ 1,680",
    image: productImg3,
    tag: "送禮推薦",
    description: "包含經典素顏霜 30ml + 旅行版 10ml，再贈送品牌訂製雲朵化妝包。給自己或閨蜜最貼心的呵護。",
    details: [
      "內容物：素顏霜 30ml x1 + 素顏霜 10ml x1 + 雲朵化妝包 x1",
      "包裝：品牌專屬禮盒包裝 (附提袋)",
      "限量發售"
    ]
  }
];

export default function Products() {
  return (
    <section id="shop" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-wider text-sm uppercase">Online Shop</span>
          <h2 className="text-4xl font-serif text-foreground mt-2">精選系列</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[4/5] bg-secondary/30 rounded-2xl overflow-hidden mb-6">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                {product.tag && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-primary hover:bg-white shadow-sm backdrop-blur-sm border-none text-xs px-3 py-1">
                      {product.tag}
                    </Badge>
                  </div>
                )}
                
                {/* Quick Add Button Overlay */}
                <div className="absolute inset-x-4 bottom-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full rounded-full bg-white/90 text-foreground hover:bg-white shadow-lg backdrop-blur-sm">
                        查看詳情
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] bg-white/95 backdrop-blur-xl border-white/20">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-serif text-primary">{product.name}</DialogTitle>
                        <DialogDescription className="text-lg font-medium text-foreground/80 mt-2">
                          {product.price}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-6 py-4">
                        <div className="aspect-video rounded-lg overflow-hidden bg-secondary/20">
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-muted-foreground leading-relaxed">
                            {product.description}
                          </p>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium text-foreground">產品規格</h4>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                              {product.details.map((detail, i) => (
                                <li key={i}>{detail}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-4">
                        <Button className="w-full rounded-full text-lg h-12 shadow-lg shadow-primary/20">
                          立即購買
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="text-center space-y-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <h3 className="text-xl font-serif font-medium text-foreground cursor-pointer hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] bg-white/95 backdrop-blur-xl border-white/20">
                      {/* Duplicate content for accessibility if they click title instead of button */}
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-serif text-primary">{product.name}</DialogTitle>
                        <DialogDescription className="text-lg font-medium text-foreground/80 mt-2">
                          {product.price}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-6 py-4">
                        <div className="aspect-video rounded-lg overflow-hidden bg-secondary/20">
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-muted-foreground leading-relaxed">
                            {product.description}
                          </p>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium text-foreground">產品規格</h4>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                              {product.details.map((detail, i) => (
                                <li key={i}>{detail}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-4">
                        <Button className="w-full rounded-full text-lg h-12 shadow-lg shadow-primary/20">
                          立即購買
                        </Button>
                      </div>
                  </DialogContent>
                </Dialog>
                <p className="text-muted-foreground font-medium">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
