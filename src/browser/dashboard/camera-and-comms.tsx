import React, { useState } from 'react';
import { FiCamera, FiCameraOff, FiCheck, FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import { render } from '../render';
import { DashboardThemeProvider } from './components/DashboardThemeProvider';
import { useReplicant } from '@nodecg/react-hooks';
import { Commentator } from '../../types/commentators';


const CameraDashboard: React.FC = () => {
    const [nameInput, setNameInput] = useState<string>('');
    const [editingItem, setEditingItem] = useState<number | null>(null);
    const [editName, setEditName] = useState<string>('');
    const [editPronouns, setEditPronouns] = useState<string>('');

    const [cameraOn, setCameraOn] = useReplicant<boolean>('cameraOn', { defaultValue: true });
    const [commentators, setCommentators] = useReplicant<Commentator[]>('commentators', { defaultValue: [] });


    const handleAddItem = (): void => {
        if (nameInput.trim() === '') return;

        const newItem: Commentator = {
            id: Date.now(),
            name: nameInput,
            pronouns: ''
        };

        setCommentators([...commentators, newItem]);
        setNameInput('');
    };

    

    const handleDeleteItem = (id: number): void => {
        setCommentators(commentators.filter(item => item.id !== id));
        if (editingItem === id) {
            setEditingItem(null);
        }
    };

    const handleStartEdit = (item: Commentator): void => {
        setEditingItem(item.id);
        setEditName(item.name);
        setEditPronouns(item.pronouns);
    };

    const handleSaveEdit = (): void => {
        setCommentators(commentators.map(item =>
            item.id === editingItem
                ? { ...item, name: editName, pronouns: editPronouns }
                : item
        ));
        setEditingItem(null);
    };

    const handleCancelEdit = (): void => {
        setEditingItem(null);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            handleAddItem();
        }
    };

    return (
        <DashboardThemeProvider>
            {/* Camera Toggle */}
            <div className="inline-flex items-center justify-between">
                <span className="text-lg font-semibold">Camera Settings:</span>
                <span className='text-md'>{cameraOn? "Camera On" : "Camera Off"}</span>
                <button
                    onClick={() => setCameraOn(!cameraOn)}
                    className={`flex items-center justify-center w-12 h-6 rounded-full transition-colors ${cameraOn ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                >
                    {cameraOn ? <FiCamera /> : <FiCameraOff />}

                </button>
            </div>
            <h2 className='text-lg font-bold'>Commentators:</h2>
            <div className="max-w-md mx-auto w-full p-6 bg-gray-500/80 rounded-xl shadow-md">


                {/* Name Input */}
                <div className="flex items-center mb-6">
                    <input
                        type="text"
                        value={nameInput}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter name"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        onClick={handleAddItem}
                        disabled={nameInput.trim() === ''}
                        className={`p-2 rounded-r-md ${nameInput.trim() === ''
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                    >
                        <FiCheck size={20} />
                    </button>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                    {commentators.map((item) => (
                        <div key={item.id} className="bg-[#254073]/80  p-4 rounded-lg shadow-sm border border-gray-200">
                            {editingItem === item.id ? (
                                // Edit Mode
                                <div className="space-y-3">
                                    <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            value={editName}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditName(e.target.value)}
                                            className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                        <button
                                            onClick={handleSaveEdit}
                                            className="p-1 text-green-600 hover:text-green-800"
                                        >
                                            <FiCheck size={18} />
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="p-1 text-red-600 hover:text-red-800"
                                        >
                                            <FiX size={18} />
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        value={editPronouns}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditPronouns(e.target.value)}
                                        placeholder="Add pronouns"
                                        className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            ) : (
                                // Display Mode
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="font-bold">{item.name}</span>
                                        {item.pronouns && (
                                            <span className="ml-2 text-sm text-gray-300">({item.pronouns})</span>
                                        )}
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleStartEdit(item)}
                                            className="p-1 text-blue-600 hover:text-blue-800"
                                        >
                                            <FiEdit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteItem(item.id)}
                                            className="p-1 text-red-600 hover:text-red-800"
                                        >
                                            <FiTrash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {commentators.length === 0 && (
                        <div className="text-center text-white py-4">
                            No names added yet. Enter a name above to get started.
                        </div>
                    )}
                </div>
            </div>
        </DashboardThemeProvider>
    );
};

render(<CameraDashboard />)