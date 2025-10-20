import * as PetModel from './../models/animaisModel.js'

export const listarTodos = async (req, res) => {
    try{
        const animais = await PetModel.findAll();
        if (animais || animais.length === 0) {
            res.status(404).json({
                total: animais.length,
                mensagem: 'Não há animais na lista',
                animais
            })
        }
        res.status(200).json({
            total: animais.length,
            mensagem: 'Lista de animais',
            animais
        })

} catch (error) {
    res.status(500).json({
        erro: 'Erro interno de servidor',
        detalhes: error.message,
        status: 500
        })
    }
}

export const listarUm = async (req, res) => {
    try {
        const id = req.params.id;
        const pet = await PetModel.findById(id);

        if (!pet) {
            return res.status(404).json({
                erro: 'Animal não encontrado!',
                mensagem: 'Verifique se o id do animal existe',
                id: id
            })
        }

        res.status(200).json({
            mensagem: 'animal encontrado',
            pet
        })
        
    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao buscar animal por id',
            detalhes: error.message
        })
    }
}