#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItCopyDataDef {
    static constexpr std::uint8_t opcode = 0x40;
    static constexpr std::string_view name = "IT_COPY_DATA";
    static constexpr std::string_view desc = "Perform atomic CP memory-to-memory DMA block copy";
};
}
