import express from 'express';
import cors from 'cors';
import { prisma } from './config/prisma';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/user/user.routes';
import productRoutes from './modules/product/product.routes';

const app = express();
const PORT = process.env.PORT || 8090;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: '✅ Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  console.log(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ 
    error: 'Route not found',
    method: req.method,
    path: req.originalUrl 
  });
});

async function startServer() {
  try {
    console.log('🔄 Starting server...');
    
    // Kết nối database (optional)
    try {
      await prisma.$connect();
      console.log('✅ Database connected');
    } catch (dbError) {
      console.log('⚠️ Database connection failed, continuing without DB');
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer(); 