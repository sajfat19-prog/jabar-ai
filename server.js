import 'dotenv/config';
import express from 'express';
import OpenAI from 'openai';

const app = express();
const port = process.env.PORT || 3000;
const client = process.env.OPENAI_API_KEY ? new OpenAI({apiKey: process.env.OPENAI_API_KEY}) : null;
app.use(express.json({limit:'10mb'}));
app.use(express.static('public'));

app.get('/api/status', (_req,res)=>res.json({configured:!!client, model:process.env.OPENAI_MODEL||'gpt-5.6-sol'}));

app.post('/api/chat', async (req,res)=>{
  try {
    if(!client) return res.status(503).json({error:'لم يتم إعداد OPENAI_API_KEY بعد.'});
    const {messages, model} = req.body;
    if(!Array.isArray(messages) || !messages.length) return res.status(400).json({error:'لا توجد رسالة.'});
    const safe = messages.slice(-30).map(m=>({role:m.role, content:String(m.content).slice(0,20000)}));
    const response = await client.responses.create({
      model: model || process.env.OPENAI_MODEL || 'gpt-5.6-sol',
      instructions:'أنت مساعد ذكي داخل منصة Jabar AI. أجب بالعربية عند استخدام العربية، وكن واضحاً ومنظماً. لا تدّعِ امتلاك أدوات لم تُفعّل.',
      input:safe
    });
    res.json({text:response.output_text || 'لم يصل نص من النموذج.'});
  } catch(e){
    console.error(e);
    res.status(500).json({error:e?.message || 'حدث خطأ في الخادم'});
  }
});

app.listen(port,()=>console.log(`Jabar AI running on http://localhost:${port}`));
